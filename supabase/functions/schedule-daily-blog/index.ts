import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🕐 Daily blog scheduler triggered...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase configuration');
    }

    // Call the blog generation function
    const response = await fetch(`${supabaseUrl}/functions/v1/generate-blog-article`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        source: 'daily-scheduler',
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`Blog generation failed: ${response.status}`);
    }

    const result = await response.json();

    console.log('✅ Daily blog article generated successfully!');
    console.log('📝 Article details:', result.article);

    // Optional: Send notification to admin
    // You could add email/SMS notification here

    return new Response(JSON.stringify({
      success: true,
      message: 'Daily blog article generated successfully!',
      article: result.article,
      scheduled_at: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Daily blog scheduler error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false,
      scheduled_at: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});