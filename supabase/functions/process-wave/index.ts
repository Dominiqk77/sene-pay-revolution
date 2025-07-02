import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface WavePaymentRequest {
  payment_id: string;
  customer_phone: string;
  amount: number;
  reference: string;
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

    const { payment_id, customer_phone, amount, reference }: WavePaymentRequest = await req.json();

    // Configuration Wave API
    const WAVE_API_URL = 'https://api.wave.com/v1';
    const API_KEY = Deno.env.get('WAVE_API_KEY');
    const SECRET_KEY = Deno.env.get('WAVE_SECRET_KEY');

    if (!API_KEY || !SECRET_KEY) {
      console.error('Wave credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Payment service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Formatage du numéro de téléphone pour Wave (format international)
    let formattedPhone = customer_phone;
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.startsWith('221') ? `+${formattedPhone}` : `+221${formattedPhone}`;
    }

    // 1. Créer une demande de paiement Wave
    const paymentData = {
      amount: amount,
      currency: 'XOF',
      error_url: `${Deno.env.get('SITE_URL') || 'https://senepay.lovable.app'}/checkout/${payment_id}/cancel`,
      success_url: `${Deno.env.get('SITE_URL') || 'https://senepay.lovable.app'}/checkout/${payment_id}/success`,
      webhook_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/wave-webhook`,
      client_reference: reference,
      payment_method: 'wave_senegal',
      checkout_intent: 'web_payment',
      customer: {
        name: 'Client SenePay',
        phone_number: formattedPhone
      },
      metadata: {
        senepay_payment_id: payment_id,
        senepay_reference: reference
      }
    };

    // Signature HMAC pour l'authentification Wave
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const payload = JSON.stringify(paymentData);
    
    const hmacSignature = await generateHmacSignature(payload + timestamp, SECRET_KEY);

    const paymentResponse = await fetch(`${WAVE_API_URL}/checkout/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Wave-Timestamp': timestamp,
        'Wave-Signature': hmacSignature,
      },
      body: payload
    });

    const paymentResult = await paymentResponse.json();

    if (!paymentResponse.ok) {
      console.error('Wave payment error:', paymentResult);
      
      // Mapper les erreurs Wave
      const errorMapping: Record<string, string> = {
        'insufficient_balance': 'Solde Wave insuffisant',
        'invalid_phone_number': 'Numéro de téléphone invalide',
        'account_blocked': 'Compte Wave temporairement bloqué',
        'transaction_limit_exceeded': 'Limite de transaction Wave dépassée',
        'service_unavailable': 'Service Wave temporairement indisponible',
        'invalid_amount': 'Montant invalide',
        'duplicate_transaction': 'Transaction déjà effectuée'
      };

      const errorCode = paymentResult.error?.code || 'PAYMENT_ERROR';
      const errorMessage = errorMapping[errorCode] || 'Erreur lors du traitement du paiement Wave';

      return new Response(
        JSON.stringify({
          status: 'failed',
          error_code: errorCode,
          error_message: errorMessage
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Mettre à jour la transaction avec les détails Wave
    const { error: updateError } = await supabase
      .from('transactions')
      .update({
        status: 'processing',
        payment_method: 'wave',
        metadata: {
          wave_checkout_id: paymentResult.id,
          wave_session_url: paymentResult.checkout_url,
          wave_status: paymentResult.status,
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

    // 3. Log de l'audit
    await supabase.from('audit_logs').insert({
      action: 'wave_payment_initiated',
      resource_type: 'transaction',
      resource_id: payment_id,
      metadata: {
        wave_checkout_id: paymentResult.id,
        customer_phone: formattedPhone,
        amount: amount
      }
    });

    return new Response(
      JSON.stringify({
        status: 'processing',
        checkout_url: paymentResult.checkout_url,
        checkout_id: paymentResult.id,
        redirect_url: paymentResult.checkout_url
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Wave processing error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Fonction pour générer la signature HMAC pour Wave
async function generateHmacSignature(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(data);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}