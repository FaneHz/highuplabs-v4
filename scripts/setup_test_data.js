const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://qpuswbcxegxvgjbwinrq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwdXN3YmN4ZWd4dmdqYndpbnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMTY0MDMsImV4cCI6MjA4ODg5MjQwM30.kr5nbrSRQwtdFn-4wD81zO_PfyHVD-NwqH9tUgqTD1s';

const TEST_USER_ID = '6d76e819-2e6c-409c-9ead-74bd9b4254b6';

async function setupTestData() {
  console.log('Setting up test data...\n');
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  // Login as test user
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'test@highuplabs.ro',
    password: 'Test123456!'
  });
  
  if (authError) {
    console.error('❌ Login failed:', authError.message);
    return;
  }
  
  console.log('✅ Logged in as test user');
  
  // Create client profile
  const { error: profileError } = await supabase
    .from('clients')
    .upsert({
      id: TEST_USER_ID,
      full_name: 'Test User',
      company_name: 'Test Company SRL',
      phone: '0712345678',
      email: 'test@highuplabs.ro',
      plan_type: 'performance',
      role: 'client',
      onboarding_completed: false
    });
  
  if (profileError) {
    console.log('⚠️  Profile error:', profileError.message);
  } else {
    console.log('✅ Client profile created');
  }
  
  // Create test campaign snapshots
  const campaigns = [];
  for (let i = 1; i <= 3; i++) {
    for (let d = 0; d < 30; d++) {
      campaigns.push({
        client_id: TEST_USER_ID,
        platform: 'meta',
        account_id: 'test-account-123',
        campaign_id: `camp-${i}`,
        campaign_name: `Test Campaign ${i}`,
        status: i % 3 === 0 ? 'PAUSED' : 'ACTIVE',
        date: new Date(Date.now() - d * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        spend: Math.round((Math.random() * 500 + 100) * 100) / 100,
        conversions: Math.round(Math.random() * 50 + 10),
        conversion_value: Math.round((Math.random() * 5000 + 1000) * 100) / 100,
        ctr: Math.round((Math.random() * 3 + 0.5) * 100) / 100,
        cpc: Math.round((Math.random() * 10 + 2) * 100) / 100,
        roas: Math.round((Math.random() * 5 + 1) * 100) / 100,
        impressions: Math.floor(Math.random() * 10000 + 1000),
        clicks: Math.floor(Math.random() * 1000 + 100)
      });
    }
  }
  
  // Insert in batches
  for (let i = 0; i < campaigns.length; i += 50) {
    const batch = campaigns.slice(i, i + 50);
    const { error } = await supabase
      .from('campaign_snapshots')
      .upsert(batch, { onConflict: 'client_id,platform,campaign_id,date' });
    
    if (error) {
      console.log(`⚠️  Campaign batch ${i}:`, error.message);
    } else {
      console.log(`✅ Campaign batch ${i}-${i + batch.length}`);
    }
  }
  
  // Create alert rules
  const { error: alertError } = await supabase
    .from('alert_rules')
    .upsert([
      { client_id: TEST_USER_ID, metric: 'roas', operator: '<', threshold: 2.0, is_active: true },
      { client_id: TEST_USER_ID, metric: 'spend', operator: '>', threshold: 500, is_active: true }
    ]);
  
  if (alertError) {
    console.log('⚠️  Alert error:', alertError.message);
  } else {
    console.log('✅ Alert rules created');
  }
  
  console.log('\n🎉 Test data setup complete!');
}

setupTestData();
