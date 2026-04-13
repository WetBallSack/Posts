import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const HELIO_WEBHOOK_SECRET = Deno.env.get('HELIO_WEBHOOK_SECRET')

serve(async (req) => {
  try {
    // Verify the webhook secret
    const authHeader = req.headers.get('Authorization')
    if (authHeader !== `Bearer ${HELIO_WEBHOOK_SECRET}` && authHeader !== HELIO_WEBHOOK_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }

    const payload = await req.json()
    console.log('Received Helio webhook:', payload)

    // Determine if this is a successful payment/subscription
    const isSuccess = 
      payload.event === 'STARTED' || 
      payload.event === 'CREATED' || 
      payload.status === 'SUCCESS' || 
      payload.transactionObject?.meta?.transactionStatus === 'SUCCESS';

    if (isSuccess) {
      
      // Extract the paylink ID to determine the tier
      const paylinkId = payload.paylinkId || 
                        payload.paymentRequest?.id || 
                        payload.transactionObject?.paylinkId;
      
      // Extract the email from customer details
      const email = payload.email || 
                    payload.customerDetails?.email || 
                    payload.transactionObject?.meta?.customerDetails?.email ||
                    payload.meta?.customerDetails?.email;
      
      if (!email) {
        console.error('No email found in payload')
        return new Response('No email provided', { status: 400 })
      }

      let newTier = 'free'
      if (paylinkId === 'PosterProTier' || payload.paylink === 'https://moonpay.hel.io/x/PosterProTier') {
        newTier = 'pro'
      } else if (paylinkId === 'PosterWhaleTier' || payload.paylink === 'https://moonpay.hel.io/x/PosterWhaleTier') {
        newTier = 'whale'
      } else {
        console.error('Unknown paylink ID:', paylinkId)
        return new Response('Unknown paylink', { status: 400 })
      }

      // Initialize Supabase client with admin privileges to update the user config
      const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      const supabase = createClient(supabaseUrl, supabaseServiceKey)

      // Find the user by email
      const { data: users, error: userError } = await supabase.auth.admin.listUsers()
      if (userError) throw userError

      const user = users.users.find(u => u.email === email)
      if (!user) {
        console.error('User not found for email:', email)
        return new Response('User not found', { status: 404 })
      }

      // Update the user's subscription tier
      const { error: updateError } = await supabase
        .from('user_configs')
        .update({ subscription_tier: newTier })
        .eq('user_id', user.id)

      if (updateError) throw updateError

      console.log(`Successfully upgraded user ${email} to ${newTier} tier`)
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    return new Response('Ignored', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(`Webhook error: ${error.message}`, { status: 400 })
  }
})
