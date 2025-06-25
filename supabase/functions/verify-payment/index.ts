
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

    // Validation API Key
    const apiKey = req.headers.get('x-api-key')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Récupérer merchant via API key
    const { data: merchant, error: merchantError } = await supabase
      .from('merchant_accounts')
      .select('id')
      .eq('api_key', apiKey)
      .eq('is_active', true)
      .single()

    if (merchantError || !merchant) {
      return new Response(
        JSON.stringify({ error: 'Invalid API key' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Extraire payment_id de l'URL
    const url = new URL(req.url)
    const paymentId = url.pathname.split('/').pop()

    if (!paymentId) {
      return new Response(
        JSON.stringify({ error: 'Payment ID required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Récupérer la transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', paymentId)
      .eq('merchant_id', merchant.id)
      .single()

    if (transactionError || !transaction) {
      return new Response(
        JSON.stringify({ error: 'Payment not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Audit log
    await supabase.from('audit_logs').insert({
      merchant_id: merchant.id,
      action: 'verify_payment',
      resource_type: 'transaction',
      resource_id: transaction.id,
      user_agent: req.headers.get('user-agent')
    })

    return new Response(
      JSON.stringify({
        payment_id: transaction.id,
        reference: transaction.reference_id,
        amount: transaction.amount,
        currency: transaction.currency,
        status: transaction.status,
        payment_method: transaction.payment_method,
        customer_email: transaction.customer_email,
        customer_phone: transaction.customer_phone,
        description: transaction.description,
        metadata: transaction.metadata,
        created_at: transaction.created_at,
        updated_at: transaction.updated_at,
        completed_at: transaction.completed_at,
        expires_at: transaction.expires_at
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Verify payment error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
