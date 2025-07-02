import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface OrangeMoneyWebhook {
  status: string;
  txnid: string;
  order_id: string;
  reference: string;
  amount: number;
  currency: string;
  pay_token: string;
  notif_token: string;
  timestamp: string;
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

    const webhookData: OrangeMoneyWebhook = await req.json();
    
    console.log('Orange Money webhook received:', webhookData);

    // Valider la signature du webhook (sécurité)
    const notifToken = req.headers.get('X-Orange-Token');
    if (!notifToken || notifToken !== webhookData.notif_token) {
      console.error('Invalid Orange Money webhook signature');
      return new Response('Unauthorized', { status: 401 });
    }

    // Extraire l'ID de la transaction SenePay depuis la référence
    const reference = webhookData.reference.replace('SENEPAY_', '');
    
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

    // Mapper les statuts Orange Money vers les statuts SenePay
    const statusMapping: Record<string, string> = {
      'SUCCESS': 'completed',
      'FAILED': 'failed',
      'PENDING': 'processing',
      'CANCELLED': 'failed',
      'EXPIRED': 'expired'
    };

    const newStatus = statusMapping[webhookData.status] || 'failed';
    const isSuccess = newStatus === 'completed';

    // Mettre à jour la transaction
    const updateData: any = {
      status: newStatus,
      updated_at: new Date().toISOString(),
      metadata: {
        ...transaction.metadata,
        orange_money_webhook: webhookData,
        orange_money_final_status: webhookData.status,
        payment_completed_at: isSuccess ? new Date().toISOString() : null
      }
    };

    if (isSuccess) {
      updateData.completed_at = new Date().toISOString();
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
        payment_method: 'orange_money',
        customer_email: transaction.customer_email,
        customer_phone: transaction.customer_phone,
        orange_money: {
          transaction_id: webhookData.txnid,
          status: webhookData.status,
          timestamp: webhookData.timestamp
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
      action: 'orange_money_webhook_received',
      resource_type: 'transaction',
      resource_id: transaction.id,
      metadata: {
        orange_money_status: webhookData.status,
        orange_money_txnid: webhookData.txnid,
        final_status: newStatus
      }
    });

    // Répondre à Orange Money pour confirmer la réception
    return new Response(JSON.stringify({
      status: 'success',
      message: 'Webhook processed successfully'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Orange Money webhook error:', error);
    return new Response('Internal server error', { status: 500 });
  }
});