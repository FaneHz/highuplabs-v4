#!/usr/bin/env node
/**
 * Script pentru setup test user și date de test în Supabase
 * Folosește Supabase REST API (nu necesită Docker)
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://qpuswbcxegxvgjbwinrq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwdXN3YmN4ZWd4dmdqYndpbnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY0MDMsImV4cCI6MjA4ODg5MjQwM30.kr5nbrSRQwtdFn-4wD81zO_PfyHVD-NwqH9tUgqTD1s';

const TEST_USER_ID = '6d76e819-2e6c-409c-9ead-74bd9b4254b6';

async function setupTestData() {
  console.log('🔧 Setup date de test...\n');
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  try {
    // 1. Login ca test user
    console.log('🔑 Login test user...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'test@highuplabs.ro',
      password: 'Test123456!'
    });
    
    if (authError) throw authError;
    console.log('✅ Autentificat:', authData.user.id);
    
    // 2. Verifică/Creează profil client
    console.log('\n👤 Verificare profil client...');
    const { data: existingClient, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', TEST_USER_ID)
      .single();
    
    if (clientError && clientError.code !== 'PGRST116') {
      console.log('⚠️  Eroare verificare:', clientError.message);
    }
    
    if (!existingClient) {
      console.log('📝 Creare profil client...');
      const { error: insertError } = await supabase
        .from('clients')
        .insert({
          id: TEST_USER_ID,
          full_name: 'Test User',
          company_name: 'Test Company SRL',
          phone: '0712345678',
          email: 'test@highuplabs.ro',
          plan_type: 'performance',
          role: 'client',
          onboarding_completed: false
        });
      
      if (insertError) {
        console.log('⚠️  Nu s-a putut crea profil:', insertError.message);
        console.log('   (Posibil din cauza RLS - va fi creat automat de trigger)');
      } else {
        console.log('✅ Profil client creat');
      }
    } else {
      console.log('✅ Profil client existent:', existingClient.company_name);
    }
    
    // 3. Creează date de test pentru campaign snapshots
    console.log('\n📊 Creare date test campanii...');
    const campaigns = [];
    for (let i = 1; i <= 5; i++) {
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
    
    // Insert in batches of 50
    for (let i = 0; i < campaigns.length; i += 50) {
      const batch = campaigns.slice(i, i + 50);
      const { error: snapshotError } = await supabase
        .from('campaign_snapshots')
        .upsert(batch, { onConflict: 'client_id,platform,campaign_id,date' });
      
      if (snapshotError) {
        console.log(`⚠️  Eroare batch ${i}:`, snapshotError.message);
      } else {
        console.log(`✅ Batch ${i}-${i + batch.length} inserat`);
      }
    }
    
    // 4. Creează alerte de test
    console.log('\n🚨 Creare alerte test...');
    const { error: alertError } = await supabase
      .from('alert_rules')
      .upsert([
        { client_id: TEST_USER_ID, metric: 'roas', operator: '<', threshold: 2.0, is_active: true },
        { client_id: TEST_USER_ID, metric: 'spend', operator: '>', threshold: 500, is_active: true }
      ], { onConflict: 'client_id,metric,operator' });
    
    if (alertError) {
      console.log('⚠️  Eroare alerte:', alertError.message);
    } else {
      console.log('✅ Alerte create');
    }
    
    console.log('\n🎉 Setup complet!');
    console.log('\n📊 Date create:');
    console.log('   - Utilizator test: test@highuplabs.ro');
    console.log('   - Campanii: 5 campanii x 30 zile = 150 snapshot-uri');
    console.log('   - Alerte: 2 reguli active');
    
  } catch (error) {
    console.error('❌ Eroare:', error.message);
    process.exit(1);
  }
}

setupTestData();
