const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://qpuswbcxegxvgjbwinrq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwdXN3YmN4ZWd4dmdqYndpbnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY0MDMsImV4cCI6MjA4ODg5MjQwM30.kr5nbrSRQwtdFn-4wD81zO_PfyHVD-NwqH9tUgqTD1s';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function check() {
  console.log('Checking database state...\n');
  
  // Check tables exist
  const tables = ['ai_advisor_chats', 'video_scripts', 'social_strategies', 'calculator_scenarios', 'app_config'];
  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.log(`❌ ${table}: ${error.message}`);
    } else {
      console.log(`✅ ${table}: exists (rows: ${count ?? 'unknown'})`);
    }
  }
}

check();
