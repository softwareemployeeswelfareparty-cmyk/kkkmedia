const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
    console.log('✓ Supabase Client initialized successfully.');
  } catch (err) {
    console.error('[Supabase] Failed to initialize client:', err.message);
  }
} else {
  console.log('[Supabase] No SUPABASE_URL / SUPABASE_KEY provided. Using local file storage fallback.');
}

module.exports = supabase;
