import { createClient } from '@supabase/supabase-js';

/**
 * Initialise a Supabase client using the public URL and anon key. These
 * environment variables must be provided at runtime. See `.env.example` for
 * details. The client is safe to use on the server side. For browser
 * environments use `createBrowserSupabaseClient` instead.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase credentials are missing – please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your env. Using placeholder values for development.'
  );
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true
  }
});

export default supabase;
