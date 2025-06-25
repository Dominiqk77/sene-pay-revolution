
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface CreatePaymentRequest {
  amount: number;
  currency?: string;
  payment_method?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_name?: string;
  description?: string;
  callback_url?: string;
  success_url?: string;
  cancel_url?: string;
  metadata?: Record<string, any>;
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
      .select('id, user_id, business_name, is_active')
      .eq('api_key', apiKey)
      .eq('is_active', true)
      .single()

    if (merchantError || !merchant) {
      return new Response(
        JSON.stringify({ error: 'Invalid API key' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validation des données de paiement
    const paymentData: CreatePaymentRequest = await req.json()
    
    if (!paymentData.amount || paymentData.amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Amount must be greater than 0' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Créer la transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        merchant_id: merchant.id,
        amount: paymentData.amount,
        currency: paymentData.currency || 'XOF',
        payment_method: paymentData.payment_method,
        customer_email: paymentData.customer_email,
        customer_phone: paymentData.customer_phone,
        customer_name: paymentData.customer_name,
        description: paymentData.description,
        callback_url: paymentData.callback_url,
        success_url: paymentData.success_url,
        cancel_url: paymentData.cancel_url,
        metadata: paymentData.metadata || {},
        status: 'pending'
      })
      .select()
      .single()

    if (transactionError || !transaction) {
      console.error('Transaction creation error:', transactionError)
      return new Response(
        JSON.stringify({ error: 'Failed to create transaction' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Audit log
    await supabase.from('audit_logs').insert({
      merchant_id: merchant.id,
      action: 'create_payment',
      resource_type: 'transaction',
      resource_id: transaction.id,
      user_agent: req.headers.get('user-agent'),
      metadata: {
        amount: paymentData.amount,
        currency: paymentData.currency || 'XOF',
        payment_method: paymentData.payment_method
      }
    })

    const siteUrl = Deno.env.get('SUPABASE_URL')?.replace('supabase.co', 'lovable.app') || 'https://sene-pay-revolution.lovable.app'
    
    return new Response(
      JSON.stringify({
        payment_id: transaction.id,
        reference: transaction.reference_id,
        checkout_url: `${siteUrl}/checkout/${transaction.id}`,
        amount: transaction.amount,
        currency: transaction.currency,
        expires_at: transaction.expires_at,
        status: transaction.status,
        created_at: transaction.created_at
      }),
      { 
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Create payment error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
