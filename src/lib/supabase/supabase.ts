import { createClient } from '@supabase/supabase-js'

const supabaseUrl = //import.meta.env.SUPABASE_URL  
"https://zytxmrkfomajlmiykmnz.supabase.co";
const supabaseKey = //import.meta.env.SUPABASE_ANON_KEY
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5dHhtcmtmb21hamxtaXlrbW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyNTgxMzgsImV4cCI6MjAxOTgzNDEzOH0.TCGI2tJpuP6pu3ErZSIVkcUQAR2kCQEe191G-1x9L_8";
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      flowType: "pkce",
      // autoRefreshToken: false,
      // detectSessionInUrl: false,
      // persistSession: true,
    },
  });
