import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    let userId: string | null = null;
    let isTest = false;

    // Parse request body if it's a POST request (for manual testing)
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        userId = body.user_id;
        isTest = body.is_test || false;
      } catch (e) {
        console.log("No JSON body or invalid JSON");
      }
    }

    // Fetch configurations
    let query = supabaseClient
      .from('user_configs')
      .select(`
        user_id,
        persona_style,
        post_interval_minutes,
        custom_prompt,
        is_active,
        next_post_time,
        binance_api_key_id,
        groq_api_key_id
      `);

    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      // If triggered by cron, only get active users whose next_post_time is due
      query = query
        .eq('is_active', true)
        .lte('next_post_time', new Date().toISOString());
    }

    const { data: configs, error: configError } = await query;

    if (configError) throw configError;
    if (!configs || configs.length === 0) {
      return new Response(JSON.stringify({ message: "No active configurations due for posting." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    const results = [];

    for (const config of configs) {
      try {
        // 1. Fetch API keys from Vault
        let binanceApiKey = null;
        let groqApiKey = null;

        if (config.binance_api_key_id) {
          const { data: binanceSecret } = await supabaseClient
            .from('decrypted_secrets')
            .select('decrypted_secret')
            .eq('id', config.binance_api_key_id)
            .single();
          binanceApiKey = binanceSecret?.decrypted_secret;
        }

        if (config.groq_api_key_id) {
          const { data: groqSecret } = await supabaseClient
            .from('decrypted_secrets')
            .select('decrypted_secret')
            .eq('id', config.groq_api_key_id)
            .single();
          groqApiKey = groqSecret?.decrypted_secret;
        }

        if (!binanceApiKey || !groqApiKey) {
          throw new Error("Missing Binance or Groq API keys in Vault. Please re-save your configuration.");
        }

        // 2. Generate content using Groq (Mocked for now, replace with actual Groq API call)
        // In a real scenario, you would fetch market data from Binance here, 
        // then pass it to Groq to generate the post based on the persona.
        const generatedContent = `[${config.persona_style.toUpperCase()}] Market is looking volatile today! #Crypto #Trading`;

        // 3. Log the generated signal
        const { error: logError } = await supabaseClient
          .from('signals_log')
          .insert({
            user_id: config.user_id,
            content: generatedContent,
            post_type: config.persona_style,
            status: 'published'
          });

        if (logError) throw logError;

        // 4. Update next_post_time
        if (!isTest) {
          const nextTime = new Date(Date.now() + config.post_interval_minutes * 60000);
          await supabaseClient
            .from('user_configs')
            .update({ next_post_time: nextTime.toISOString() })
            .eq('user_id', config.user_id);
        }

        results.push({ user_id: config.user_id, status: 'success' });
      } catch (err: any) {
        console.error(`Error processing user ${config.user_id}:`, err);
        results.push({ user_id: config.user_id, status: 'error', error: err.message });
        
        // Log the error in signals_log
        await supabaseClient
          .from('signals_log')
          .insert({
            user_id: config.user_id,
            content: `Failed to generate post: ${err.message}`,
            post_type: config.persona_style,
            status: 'failed',
            error_message: err.message
          });
      }
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: any) {
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
