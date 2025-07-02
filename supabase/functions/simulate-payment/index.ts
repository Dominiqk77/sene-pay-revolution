
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface SimulatePaymentRequest {
  payment_id: string;
  payment_method: string;
  customer_phone?: string;
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

    const { payment_id, payment_method, customer_phone }: SimulatePaymentRequest = await req.json()

    if (!payment_id || !payment_method) {
      return new Response(
        JSON.stringify({ error: 'Payment ID and payment method required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Récupérer la transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .select('*, merchant_accounts!inner(business_name)')
      .eq('id', payment_id)
      .single()

    if (transactionError || !transaction) {
      return new Response(
        JSON.stringify({ error: 'Payment not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (transaction.status !== 'pending') {
      return new Response(
        JSON.stringify({ error: 'Payment already processed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Récupérer la configuration de la méthode de paiement
    const { data: paymentMethodConfig, error: configError } = await supabase
      .from('payment_methods')
      .select('config')
      .eq('code', payment_method)
      .eq('is_active', true)
      .single()

    if (configError || !paymentMethodConfig) {
      return new Response(
        JSON.stringify({ error: 'Payment method not supported' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const config = paymentMethodConfig.config as any
    const successRate = config.success_rate || 0.85
    const minDelay = config.min_delay || 5
    const maxDelay = config.max_delay || 15

    // Traitement réel selon la méthode de paiement
    if (payment_method === 'orange_money') {
      return await processOrangeMoneyPayment(payment_id, customer_phone, transaction.amount, transaction.reference_id, supabase);
    } else if (payment_method === 'wave') {
      return await processWavePayment(payment_id, customer_phone, transaction.amount, transaction.reference_id, supabase);
    } else {
      // Fallback: simulation pour les autres méthodes (cartes, etc.)
      const processingDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      await new Promise(resolve => setTimeout(resolve, processingDelay * 1000));
      const isSuccess = Math.random() < successRate;
      const newStatus = isSuccess ? 'completed' : 'failed';
      return await simulateGenericPayment(payment_id, payment_method, transaction, isSuccess, newStatus, customer_phone, supabase);
    }

  } catch (error) {
    console.error('Simulate payment error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function getErrorMessage(errorCode: string, paymentMethod: string): string {
  const messages: Record<string, string> = {
    'INSUFFICIENT_FUNDS': 'Solde insuffisant pour effectuer cette transaction',
    'NETWORK_TIMEOUT': 'Délai d\'attente réseau dépassé, veuillez réessayer',
    'INVALID_PIN': 'Code PIN incorrect',
    'SERVICE_UNAVAILABLE': 'Service temporairement indisponible',
    'ACCOUNT_BLOCKED': 'Compte temporairement bloqué',
    'DAILY_LIMIT_EXCEEDED': 'Limite quotidienne de transaction dépassée',
    'INVALID_OTP': 'Code de vérification incorrect',
    'NETWORK_ERROR': 'Erreur de connexion réseau',
    'CARD_DECLINED': 'Carte refusée par la banque',
    'CARD_EXPIRED': 'Carte expirée',
    'CVV_MISMATCH': 'Code de sécurité incorrect',
    'INSUFFICIENT_BALANCE': 'Solde insuffisant',
    'PIN_INCORRECT': 'Code PIN incorrect',
    'SERVICE_TIMEOUT': 'Service indisponible, réessayez plus tard',
    'ACCOUNT_SUSPENDED': 'Compte suspendu',
    'BALANCE_LOW': 'Solde trop faible',
    'PIN_BLOCKED': 'Code PIN bloqué',
    'TRANSACTION_LIMIT': 'Limite de transaction atteinte',
    'NETWORK_ISSUE': 'Problème de réseau',
    'GENERIC_ERROR': 'Erreur lors du traitement du paiement'
  }

  return messages[errorCode] || messages['GENERIC_ERROR']
}

// Fonction pour traiter les paiements Orange Money
async function processOrangeMoneyPayment(payment_id: string, customer_phone: string, amount: number, reference: string, supabase: any) {
  try {
    const response = await supabase.functions.invoke('process-orange-money', {
      body: {
        payment_id,
        customer_phone,
        amount,
        reference
      }
    });

    if (response.error) {
      console.error('Orange Money processing error:', response.error);
      return new Response(
        JSON.stringify({
          status: 'failed',
          error_code: 'ORANGE_MONEY_ERROR',
          error_message: 'Erreur lors du traitement Orange Money'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'processing',
        payment_url: response.data.payment_url,
        redirect_url: response.data.payment_url,
        message: 'Redirection vers Orange Money en cours...'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Orange Money integration error:', error);
    return new Response(
      JSON.stringify({ error: 'Orange Money service unavailable' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// Fonction pour traiter les paiements Wave
async function processWavePayment(payment_id: string, customer_phone: string, amount: number, reference: string, supabase: any) {
  try {
    const response = await supabase.functions.invoke('process-wave', {
      body: {
        payment_id,
        customer_phone,
        amount,
        reference
      }
    });

    if (response.error) {
      console.error('Wave processing error:', response.error);
      return new Response(
        JSON.stringify({
          status: 'failed',
          error_code: 'WAVE_ERROR',
          error_message: 'Erreur lors du traitement Wave'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'processing',
        checkout_url: response.data.checkout_url,
        redirect_url: response.data.checkout_url,
        message: 'Redirection vers Wave en cours...'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Wave integration error:', error);
    return new Response(
      JSON.stringify({ error: 'Wave service unavailable' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// Fonction pour simuler les autres méthodes de paiement (cartes, etc.)
async function simulateGenericPayment(payment_id: string, payment_method: string, transaction: any, isSuccess: boolean, newStatus: string, customer_phone: string, supabase: any) {
  const errorCodes = {
    visa_card: ['CARD_DECLINED', 'INSUFFICIENT_FUNDS', 'CARD_EXPIRED', 'CVV_MISMATCH'],
    mastercard: ['CARD_DECLINED', 'INSUFFICIENT_FUNDS', 'CARD_EXPIRED', 'CVV_MISMATCH'],
    free_money: ['INSUFFICIENT_BALANCE', 'PIN_INCORRECT', 'SERVICE_TIMEOUT', 'ACCOUNT_SUSPENDED'],
    wizall: ['BALANCE_LOW', 'PIN_BLOCKED', 'TRANSACTION_LIMIT', 'NETWORK_ISSUE']
  };

  const errorCode = !isSuccess ? 
    (errorCodes[payment_method as keyof typeof errorCodes] || ['GENERIC_ERROR'])[
      Math.floor(Math.random() * (errorCodes[payment_method as keyof typeof errorCodes] || ['GENERIC_ERROR']).length)
    ] : null;

  // Mettre à jour la transaction
  const updateData: any = {
    status: newStatus,
    payment_method: payment_method,
    updated_at: new Date().toISOString()
  };

  if (customer_phone) {
    updateData.customer_phone = customer_phone;
  }

  if (isSuccess) {
    updateData.completed_at = new Date().toISOString();
  } else {
    updateData.metadata = {
      ...transaction.metadata,
      error_code: errorCode,
      error_message: getErrorMessage(errorCode, payment_method)
    };
  }

  const { data: updatedTransaction, error: updateError } = await supabase
    .from('transactions')
    .update(updateData)
    .eq('id', payment_id)
    .select()
    .single();

  if (updateError) {
    console.error('Transaction update error:', updateError);
    return new Response(
      JSON.stringify({ error: 'Failed to update transaction' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Créer webhook event pour notifier le merchant
  if (transaction.callback_url) {
    const webhookPayload = {
      event: isSuccess ? 'payment.completed' : 'payment.failed',
      payment_id: payment_id,
      reference: transaction.reference_id,
      amount: transaction.amount,
      currency: transaction.currency,
      status: newStatus,
      payment_method: payment_method,
      customer_email: transaction.customer_email,
      customer_phone: customer_phone || transaction.customer_phone,
      metadata: updatedTransaction.metadata,
      timestamp: new Date().toISOString()
    };

    await supabase.from('webhook_events').insert({
      merchant_id: transaction.merchant_id,
      transaction_id: payment_id,
      event_type: isSuccess ? 'payment.completed' : 'payment.failed',
      payload: webhookPayload,
      webhook_url: transaction.callback_url,
      next_retry_at: new Date().toISOString()
    });
  }

  return new Response(
    JSON.stringify({
      payment_id: payment_id,
      reference: transaction.reference_id,
      status: newStatus,
      payment_method: payment_method,
      amount: transaction.amount,
      currency: transaction.currency,
      error_code: errorCode,
      error_message: errorCode ? getErrorMessage(errorCode, payment_method) : null,
      completed_at: updatedTransaction.completed_at,
      redirect_url: isSuccess ? transaction.success_url : transaction.cancel_url
    }),
    { 
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}
