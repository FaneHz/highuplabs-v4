#!/usr/bin/env node
/**
 * Script pentru crearea contului de test în Supabase
 * 
 * Usage: node scripts/create-test-user.js
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://qpuswbcxegxvgjbwinrq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwdXN3YmN4ZWd4dmdqYndpbnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY0MDMsImV4cCI6MjA4ODg5MjQwM30.kr5nbrSRQwtdFn-4wD81zO_PfyHVD-NwqH9tUgqTD1s';

const TEST_USER = {
  email: 'test@highuplabs.ro',
  password: 'Test123456!',
  fullName: 'Test User',
  companyName: 'Test Company SRL',
  phone: '0712345678'
};

async function createTestUser() {
  console.log('🚀 Creare cont de test...\n');
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  try {
    // 1. Sign up test user
    console.log('📧 Înregistrare utilizator...');
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: TEST_USER.email,
      password: TEST_USER.password,
      options: {
        data: {
          full_name: TEST_USER.fullName,
          company_name: TEST_USER.companyName,
          phone: TEST_USER.phone
        }
      }
    });
    
    if (authError) {
      if (authError.message.includes('User already registered')) {
        console.log('⚠️  Utilizatorul există deja. Încercare login...');
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: TEST_USER.email,
          password: TEST_USER.password
        });
        
        if (loginError) throw loginError;
        console.log('✅ Login reușit:', loginData.user?.id);
      } else {
        throw authError;
      }
    } else {
      console.log('✅ Utilizator creat:', authData.user?.id);
      console.log('📧 Email confirmare trimis la:', TEST_USER.email);
    }
    
    // 2. Verificare profil în tabela clients
    console.log('\n🏢 Verificare profil client...');
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('email', TEST_USER.email)
      .single();
    
    if (clientError && clientError.code !== 'PGRST116') {
      console.log('⚠️  Eroare la verificare profil:', clientError.message);
    }
    
    if (clientData) {
      console.log('✅ Profil client existent:', clientData.id);
    } else {
      console.log('ℹ️  Profilul client va fi creat automat de trigger-ul din Supabase');
    }
    
    console.log('\n🎉 Cont de test configurat cu succes!');
    console.log('\n📋 Detalii login:');
    console.log('   Email:', TEST_USER.email);
    console.log('   Password:', TEST_USER.password);
    console.log('\n📝 NOTĂ: Verifică email-ul pentru confirmare!');
    
  } catch (error) {
    console.error('❌ Eroare:', error.message);
    process.exit(1);
  }
}

createTestUser();
