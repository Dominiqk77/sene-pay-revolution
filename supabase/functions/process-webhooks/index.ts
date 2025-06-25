
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Récupérer les webhooks en attente avec retry exponentiel
    const { data: pendingWebhooks, error: webhooksError } = await supabase
      .from('webhook_events')
      .select('*')
      .eq('delivered', false)
      .lt('attempts', 'max_attempts')
      .lte('next_retry_at', new Date().toISOString())
      .limit(10)

    if (webhooksError) {
      console.error('Error fetching webhooks:', webhooksError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch webhooks' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const results = []

    for (const webhook of pendingWebhooks || []) {
      try {
        // Générer signature HMAC
        const signature = await generateHmacSignature(JSON.stringify(webhook.payload), 'senepay_webhook_secret')
        
        // Envoyer le webhook
        const response = await fetch(webhook.webhook_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-SenePay-Signature': signature,
            'X-SenePay-Event': webhook.event_type,
            'User-Agent': 'SenePay-Webhooks/1.0'
          },
          body: JSON.stringify(webhook.payload)
        })

        const success = response.ok
        const nextRetryAt = success ? null : getNextRetryTime(webhook.attempts + 1)

        // Mettre à jour le webhook
        await supabase
          .from('webhook_events')
          .update({
            attempts: webhook.attempts + 1,
            delivered: success,
            last_attempt_at: new Date().toISOString(),
            next_retry_at: nextRetryAt
          })
          .eq('id', webhook.id)

        results.push({
          webhook_id: webhook.id,
          success,
          status_code: response.status,
          attempts: webhook.attempts + 1
        })

        // Log de l'audit
        await supabase.from('audit_logs').insert({
          merchant_id: webhook.merchant_id,
          action: 'webhook_delivery',
          resource_type: 'webhook',
          resource_id: webhook.id,
          metadata: {
            success,
            status_code: response.status,
            attempts: webhook.attempts + 1,
            event_type: webhook.event_type
          }
        })

      } catch (error) {
        console.error(`Webhook delivery failed for ${webhook.id}:`, error)
        
        const nextRetryAt = getNextRetryTime(webhook.attempts + 1)
        
        await supabase
          .from('webhook_events')
          .update({
            attempts: webhook.attempts + 1,
            last_attempt_at: new Date().toISOString(),
            next_retry_at: nextRetryAt
          })
          .eq('id', webhook.id)

        results.push({
          webhook_id: webhook.id,
          success: false,
          error: error.message,
          attempts: webhook.attempts + 1
        })
      }
    }

    return new Response(
      JSON.stringify({
        processed: results.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Process webhooks error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function generateHmacSignature(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const messageData = encoder.encode(payload)
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData)
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function getNextRetryTime(attempts: number): string {
  // Exponential backoff: 1min, 5min, 15min, 30min, 1h
  const delays = [60, 300, 900, 1800, 3600] // en secondes
  const delayIndex = Math.min(attempts - 1, delays.length - 1)
  const delay = delays[delayIndex]
  
  const nextTime = new Date()
  nextTime.setSeconds(nextTime.getSeconds() + delay)
  return nextTime.toISOString()
}
