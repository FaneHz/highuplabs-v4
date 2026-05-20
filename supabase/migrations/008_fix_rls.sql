-- Migration: Fix RLS policies + add onboarding_completed + delete test account
-- Created: 2026-05-20

-- ============================================
-- 1. Helper function for admin checks (prevents infinite recursion)
-- ============================================
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM clients 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$;

-- ============================================
-- 2. Fix applications RLS
-- ============================================
ALTER TABLE IF EXISTS applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all insert" ON applications;
DROP POLICY IF EXISTS "Allow admin select" ON applications;
DROP POLICY IF EXISTS "Allow anonymous insert" ON applications;
DROP POLICY IF EXISTS "Admin can view all applications" ON applications;

CREATE POLICY "Allow anonymous insert" ON applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view all applications" ON applications
  FOR SELECT USING (is_admin(auth.uid()));

-- ============================================
-- 3. Fix clients RLS (eliminate infinite recursion)
-- ============================================
ALTER TABLE IF EXISTS clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own client data" ON clients;
DROP POLICY IF EXISTS "Users can update own client data" ON clients;
DROP POLICY IF EXISTS "Admins can manage all clients" ON clients;
DROP POLICY IF EXISTS "Users can insert own client data" ON clients;
DROP POLICY IF EXISTS "Users can read own data" ON clients;
DROP POLICY IF EXISTS "Users can update own data" ON clients;
DROP POLICY IF EXISTS "Users can insert own data" ON clients;

CREATE POLICY "Users can read own data" ON clients
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON clients
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON clients
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can manage all clients" ON clients
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================
-- 4. Fix offers RLS
-- ============================================
ALTER TABLE IF EXISTS offers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage all offers" ON offers;
DROP POLICY IF EXISTS "Users can view own offers" ON offers;
DROP POLICY IF EXISTS "Allow anonymous insert" ON offers;

CREATE POLICY "Allow anonymous insert" ON offers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own offers" ON offers
  FOR SELECT USING (auth.uid() IN (SELECT id FROM clients WHERE email = offers.email));

CREATE POLICY "Admins can manage all offers" ON offers
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================
-- 5. Add onboarding_completed to clients
-- ============================================
ALTER TABLE clients 
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- ============================================
-- 6. Delete test account
-- ============================================
DELETE FROM clients WHERE email = 'djste5367@gmail.com';
DELETE FROM auth.users WHERE email = 'djste5367@gmail.com';
