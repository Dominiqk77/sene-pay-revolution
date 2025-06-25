
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

    // Paramètres de pagination et filtres
    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100)
    const status = url.searchParams.get('status')
    const paymentMethod = url.searchParams.get('payment_method')
    const fromDate = url.searchParams.get('from_date')
    const toDate = url.searchParams.get('to_date')

    const offset = (page - 1) * limit

    // Construction de la requête avec filtres
    let query = supabase
      .from('transactions')
      .select('*', { count: 'exact' })
      .eq('merchant_id', merchant.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
    }
    if (paymentMethod) {
      query = query.eq('payment_method', paymentMethod)
    }
    if (fromDate) {
      query = query.gte('created_at', fromDate)
    }
    if (toDate) {
      query = query.lte('created_at', toDate)
    }

    const { data: transactions, error: transactionsError, count } = await query

    if (transactionsError) {
      console.error('Transactions query error:', transactionsError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch transactions' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Calcul des statistiques
    const statsQuery = supabase
      .from('transactions')
      .select('status, amount, payment_method')
      .eq('merchant_id', merchant.id)

    if (fromDate) {
      statsQuery.gte('created_at', fromDate)
    }
    if (toDate) {
      statsQuery.lte('created_at', toDate)
    }

    const { data: allTransactions } = await statsQuery

    const stats = {
      total_transactions: count || 0,
      total_amount: allTransactions?.reduce((sum, t) => sum + Number(t.amount), 0) || 0,
      completed_amount: allTransactions?.filter(t => t.status === 'completed').reduce((sum, t) => sum + Number(t.amount), 0) || 0,
      success_rate: allTransactions?.length ? 
        (allTransactions.filter(t => t.status === 'completed').length / allTransactions.length * 100) : 0,
      by_status: {
        pending: allTransactions?.filter(t => t.status === 'pending').length || 0,
        completed: allTransactions?.filter(t => t.status === 'completed').length || 0,
        failed: allTransactions?.filter(t => t.status === 'failed').length || 0,
        refunded: allTransactions?.filter(t => t.status === 'refunded').length || 0
      },
      by_payment_method: allTransactions?.reduce((acc: Record<string, number>, t) => {
        if (t.payment_method) {
          acc[t.payment_method] = (acc[t.payment_method] || 0) + 1
        }
        return acc
      }, {}) || {}
    }

    // Audit log
    await supabase.from('audit_logs').insert({
      merchant_id: merchant.id,
      action: 'list_transactions',
      resource_type: 'transaction',
      user_agent: req.headers.get('user-agent'),
      metadata: {
        page,
        limit,
        filters: { status, paymentMethod, fromDate, toDate }
      }
    })

    const totalPages = Math.ceil((count || 0) / limit)

    return new Response(
      JSON.stringify({
        transactions: transactions || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          total_pages: totalPages,
          has_next: page < totalPages,
          has_previous: page > 1
        },
        statistics: stats
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('List transactions error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
