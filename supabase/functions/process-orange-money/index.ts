import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface OrangeMoneyPaymentRequest {
  payment_id: string;
  customer_phone: string;
  amount: number;
  reference: string;
}

interface OrangeMoneyResponse {
  status: 'success' | 'failed' | 'pending';
  transaction_id?: string;
  error_code?: string;
  error_message?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { payment_id, customer_phone, amount, reference }: OrangeMoneyPaymentRequest = await req.json();

    // Configuration Orange Money API
    const ORANGE_MONEY_API_URL = 'https://api.orange.com/orange-money-webpay/dev/v1';
    const CLIENT_ID = Deno.env.get('ORANGE_MONEY_CLIENT_ID');
    const CLIENT_SECRET = Deno.env.get('ORANGE_MONEY_CLIENT_SECRET');
    const MERCHANT_KEY = Deno.env.get('ORANGE_MONEY_MERCHANT_KEY');

    if (!CLIENT_ID || !CLIENT_SECRET || !MERCHANT_KEY) {
      console.error('Orange Money credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Payment service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. Obtenir le token d'accès
    const tokenResponse = await fetch(`${ORANGE_MONEY_API_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
      },
      body: 'grant_type=client_credentials'
    });

    if (!tokenResponse.ok) {
      console.error('Orange Money token error:', await tokenResponse.text());
      return new Response(
        JSON.stringify({ error: 'Authentication failed with Orange Money' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Initier le paiement
    const paymentData = {
      merchant_key: MERCHANT_KEY,
      currency: 'XOF',
      order_id: reference,
      amount: amount,
      return_url: `${Deno.env.get('SITE_URL') || 'https://senepay.lovable.app'}/checkout/${payment_id}/success`,
      cancel_url: `${Deno.env.get('SITE_URL') || 'https://senepay.lovable.app'}/checkout/${payment_id}/cancel`,
      notif_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/orange-money-webhook`,
      lang: 'fr',
      reference: `SENEPAY_${reference}`,
      customer_phone: customer_phone.replace(/^\+221/, ''), // Retirer le préfixe +221
    };

    const paymentResponse = await fetch(`${ORANGE_MONEY_API_URL}/webpayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(paymentData)
    });

    const paymentResult = await paymentResponse.json();

    if (!paymentResponse.ok) {
      console.error('Orange Money payment error:', paymentResult);
      
      // Mapper les erreurs Orange Money
      const errorMapping: Record<string, string> = {
        'INSUFFICIENT_FUNDS': 'Solde insuffisant',
        'INVALID_PHONE': 'Numéro de téléphone invalide',
        'SERVICE_UNAVAILABLE': 'Service Orange Money temporairement indisponible',
        'TRANSACTION_LIMIT': 'Limite de transaction dépassée',
        'ACCOUNT_BLOCKED': 'Compte Orange Money bloqué'
      };

      const errorCode = paymentResult.error_code || 'PAYMENT_ERROR';
      const errorMessage = errorMapping[errorCode] || 'Erreur lors du traitement du paiement Orange Money';

      return new Response(
        JSON.stringify({
          status: 'failed',
          error_code: errorCode,
          error_message: errorMessage
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Mettre à jour la transaction avec les détails Orange Money
    const { error: updateError } = await supabase
      .from('transactions')
      .update({
        status: 'processing',
        payment_method: 'orange_money',
        metadata: {
          orange_money_transaction_id: paymentResult.txnid,
          orange_money_token: paymentResult.token,
          orange_money_payment_url: paymentResult.payment_url,
          processor_response: paymentResult
        },
        updated_at: new Date().toISOString()
      })
      .eq('id', payment_id);

    if (updateError) {
      console.error('Transaction update error:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update transaction' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Log de l'audit
    await supabase.from('audit_logs').insert({
      action: 'orange_money_payment_initiated',
      resource_type: 'transaction',
      resource_id: payment_id,
      metadata: {
        orange_money_txnid: paymentResult.txnid,
        customer_phone: customer_phone,
        amount: amount
      }
    });

    return new Response(
      JSON.stringify({
        status: 'processing',
        payment_url: paymentResult.payment_url,
        transaction_id: paymentResult.txnid,
        token: paymentResult.token,
        redirect_url: paymentResult.payment_url
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Orange Money processing error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});