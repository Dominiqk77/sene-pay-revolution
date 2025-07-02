import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface WaveWebhook {
  type: string; // 'checkout.completed', 'checkout.failed', etc.
  data: {
    id: string;
    status: string;
    amount: number;
    currency: string;
    client_reference: string;
    payment_status: string;
    checkout_status: string;
    created_at: string;
    completed_at?: string;
    customer: {
      name: string;
      phone_number: string;
    };
    metadata?: any;
  };
  created_at: string;
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

    const webhookData: WaveWebhook = await req.json();
    
    console.log('Wave webhook received:', webhookData);

    // Valider la signature du webhook Wave (recommandé pour la sécurité)
    const signature = req.headers.get('Wave-Signature');
    const timestamp = req.headers.get('Wave-Timestamp');
    
    // TODO: Implémenter la validation de signature Wave si disponible
    // const isValidSignature = await validateWaveSignature(req.body, signature, timestamp);
    // if (!isValidSignature) {
    //   return new Response('Unauthorized', { status: 401 });
    // }

    // Extraire la référence client (notre reference_id)
    const reference = webhookData.data.client_reference;
    
    // Trouver la transaction correspondante
    const { data: transaction, error: findError } = await supabase
      .from('transactions')
      .select('*')
      .eq('reference_id', reference)
      .single();

    if (findError || !transaction) {
      console.error('Transaction not found for reference:', reference);
      return new Response('Transaction not found', { status: 404 });
    }

    // Mapper les statuts Wave vers les statuts SenePay
    const getStatusFromWebhook = (webhookType: string, checkoutStatus: string, paymentStatus: string) => {
      if (webhookType === 'checkout.completed' && paymentStatus === 'succeeded') {
        return 'completed';
      } else if (webhookType === 'checkout.failed' || paymentStatus === 'failed') {
        return 'failed';
      } else if (checkoutStatus === 'pending' || paymentStatus === 'pending') {
        return 'processing';
      } else if (checkoutStatus === 'expired') {
        return 'expired';
      } else {
        return 'failed';
      }
    };

    const newStatus = getStatusFromWebhook(
      webhookData.type, 
      webhookData.data.checkout_status, 
      webhookData.data.payment_status
    );
    const isSuccess = newStatus === 'completed';

    // Mettre à jour la transaction
    const updateData: any = {
      status: newStatus,
      updated_at: new Date().toISOString(),
      metadata: {
        ...transaction.metadata,
        wave_webhook: webhookData,
        wave_final_status: webhookData.data.status,
        wave_payment_status: webhookData.data.payment_status,
        payment_completed_at: isSuccess ? webhookData.data.completed_at : null
      }
    };

    if (isSuccess && webhookData.data.completed_at) {
      updateData.completed_at = webhookData.data.completed_at;
    }

    const { error: updateError } = await supabase
      .from('transactions')
      .update(updateData)
      .eq('id', transaction.id);

    if (updateError) {
      console.error('Transaction update error:', updateError);
      return new Response('Update failed', { status: 500 });
    }

    // Créer un événement webhook pour notifier le marchand
    if (transaction.callback_url) {
      const merchantWebhookPayload = {
        event: isSuccess ? 'payment.completed' : 'payment.failed',
        payment_id: transaction.id,
        reference: transaction.reference_id,
        amount: transaction.amount,
        currency: transaction.currency,
        status: newStatus,
        payment_method: 'wave',
        customer_email: transaction.customer_email,
        customer_phone: transaction.customer_phone,
        wave: {
          checkout_id: webhookData.data.id,
          payment_status: webhookData.data.payment_status,
          checkout_status: webhookData.data.checkout_status,
          completed_at: webhookData.data.completed_at
        },
        timestamp: new Date().toISOString()
      };

      await supabase.from('webhook_events').insert({
        merchant_id: transaction.merchant_id,
        transaction_id: transaction.id,
        event_type: isSuccess ? 'payment.completed' : 'payment.failed',
        payload: merchantWebhookPayload,
        webhook_url: transaction.callback_url,
        next_retry_at: new Date().toISOString()
      });
    }

    // Log d'audit
    await supabase.from('audit_logs').insert({
      merchant_id: transaction.merchant_id,
      action: 'wave_webhook_received',
      resource_type: 'transaction',
      resource_id: transaction.id,
      metadata: {
        wave_checkout_status: webhookData.data.checkout_status,
        wave_payment_status: webhookData.data.payment_status,
        wave_checkout_id: webhookData.data.id,
        final_status: newStatus
      }
    });

    // Répondre à Wave pour confirmer la réception
    return new Response(JSON.stringify({
      status: 'success',
      message: 'Webhook processed successfully'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Wave webhook error:', error);
    return new Response('Internal server error', { status: 500 });
  }
});