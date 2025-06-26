
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? 'https://senepay.lovable.app' 
    : 'http://localhost:5173',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

// Rate limiting basique côté serveur
const rateLimiter = new Map<string, number[]>();

const isRateAllowed = (clientIP: string, maxRequests: number = 30, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const requests = rateLimiter.get(clientIP) || [];
  
  // Nettoyer les anciennes requêtes
  const validRequests = requests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return false;
  }
  
  validRequests.push(now);
  rateLimiter.set(clientIP, validRequests);
  return true;
};

// Validation des montants
const validateAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 10000000 && Number.isFinite(amount);
};

// Validation des emails
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Sanitisation des entrées
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove basic HTML tags
    .slice(0, 1000); // Limit length
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting par IP
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    if (!isRateAllowed(clientIP, 30, 60000)) { // 30 requêtes par minute
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validation de l'API key
    const apiKey = req.headers.get('x-api-key');
    if (!apiKey || !apiKey.startsWith('sk_live_')) {
      // Logger la tentative d'accès non autorisée sans révéler d'informations sensibles
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const requestBody = await req.json();
    
    // Validation et sanitisation des entrées
    if (!requestBody.amount || !validateAmount(requestBody.amount)) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (requestBody.customer_email && !validateEmail(requestBody.customer_email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Sanitiser les entrées texte
    const sanitizedData = {
      ...requestBody,
      customer_name: requestBody.customer_name ? sanitizeInput(requestBody.customer_name) : null,
      description: requestBody.description ? sanitizeInput(requestBody.description) : null,
      amount: Number(requestBody.amount),
      currency: requestBody.currency || 'XOF'
    };

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: {
            Authorization: req.headers.get('Authorization')!,
          },
        },
      }
    );

    // Vérifier l'existence du merchant
    const { data: merchant, error: merchantError } = await supabaseClient
      .from('merchant_accounts')
      .select('*')
      .eq('api_key', apiKey)
      .single();

    if (merchantError) {
      console.error('Merchant account error:', merchantError);
      return new Response(
        JSON.stringify({ error: 'Invalid API key' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Créer la transaction avec données sanitisées
    const { data: transaction, error: transactionError } = await supabaseClient
      .from('transactions')
      .insert({
        merchant_id: merchant.id,
        amount: sanitizedData.amount,
        currency: sanitizedData.currency,
        customer_name: sanitizedData.customer_name,
        customer_email: sanitizedData.customer_email,
        customer_phone: sanitizedData.customer_phone,
        description: sanitizedData.description,
        payment_method: sanitizedData.payment_method,
        callback_url: sanitizedData.callback_url,
        success_url: sanitizedData.success_url,
        cancel_url: sanitizedData.cancel_url,
        metadata: sanitizedData.metadata || {}
      })
      .select()
      .single();

    if (transactionError) {
      console.error('Transaction creation error:', transactionError);
      return new Response(
        JSON.stringify({ error: 'Failed to create transaction' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Logger l'événement de création de transaction
    await supabaseClient.rpc('log_security_event', {
      p_action: 'TRANSACTION_CREATED',
      p_resource_type: 'transaction',
      p_resource_id: transaction.id,
      p_metadata: {
        amount: transaction.amount,
        currency: transaction.currency,
        payment_method: transaction.payment_method,
        merchant_id: merchant.id
      }
    });

    return new Response(
      JSON.stringify({
        success: true,
        transaction: {
          id: transaction.id,
          reference_id: transaction.reference_id,
          amount: transaction.amount,
          currency: transaction.currency,
          status: transaction.status,
          checkout_url: `${Deno.env.get('SITE_URL') || 'https://senepay.lovable.app'}/checkout/${transaction.id}`,
          created_at: transaction.created_at
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Create payment error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
