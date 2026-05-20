const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://qpuswbcxegxvgjbwinrq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwdXN3YmN4ZWd4dmdqYndpbnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY0MDMsImV4cCI6MjA4ODg5MjQwM30.kr5nbrSRQwtdFn-4wD81zO_PfyHVD-NwqH9tUgqTD1s';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function verify() {
  console.log('Verifying database security...\n');
  
  // 1. Check if anon can read app_config secrets (should FAIL)
  const { data: secretConfig, error: secretError } = await supabase
    .from('app_config')
    .select('*')
    .eq('key', 'OPENROUTER_API_KEY');
  
  if (secretError) {
    console.log('✅ RLS working: anon CANNOT read secrets');
  } else if (secretConfig && secretConfig.length === 0) {
    console.log('✅ RLS working: anon sees empty results for secrets');
  } else {
    console.log('❌ RLS BROKEN: anon CAN read secrets!');
    console.log('   Fix: Run security fixes SQL');
  }
  
  // 2. Check if anon can read non-secret configs (should SUCCEED)
  const { data: publicConfig, error: publicError } = await supabase
    .from('app_config')
    .select('*')
    .eq('key', 'META_APP_ID');
  
  if (publicError) {
    console.log('⚠️  Public config access blocked (might be too strict)');
  } else {
    console.log('✅ Public configs readable by anon');
  }
  
  // 3. Check app_config has is_secret column
  const { data: appConfigCols } = await supabase
    .from('app_config')
    .select('key, is_secret')
    .limit(1);
  
  if (appConfigCols && appConfigCols[0]?.is_secret !== undefined) {
    console.log('✅ is_secret column exists in app_config');
  } else {
    console.log('❌ is_secret column MISSING in app_config');
  }
  
  // 4. Check if OPENROUTER_API_KEY is set
  const { data: apiKey } = await supabase
    .from('app_config')
    .select('value')
    .eq('key', 'OPENROUTER_API_KEY')
    .single();
  
  if (apiKey?.value) {
    console.log('✅ OPENROUTER_API_KEY is set');
  } else {
    console.log('⚠️  OPENROUTER_API_KEY is EMPTY - needs to be set');
  }
  
  console.log('\nVerification complete!');
}

verify();
