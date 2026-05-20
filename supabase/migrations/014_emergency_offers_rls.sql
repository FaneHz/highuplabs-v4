-- Emergency fix: Ensure offers RLS is properly configured
-- Created: 2026-05-20

-- ============================================
-- 1. Temporarily disable RLS to clean up policies
-- ============================================
ALTER TABLE offers DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. Drop ALL existing policies on offers
-- ============================================
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN 
    SELECT policyname 
    FROM pg_policies 
    WHERE tablename = 'offers'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON offers', pol.policyname);
  END LOOP;
END $$;

-- ============================================
-- 3. Re-enable RLS
-- ============================================
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. Create correct policies
-- ============================================

-- Anonymous users can insert new offers
CREATE POLICY "Allow anonymous insert" ON offers
  FOR INSERT WITH CHECK (true);

-- Authenticated users can view their own offers (by email match)
CREATE POLICY "Users can view own offers" ON offers
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM clients WHERE email = offers.email
    )
  );

-- Admins can do everything
CREATE POLICY "Admins can manage all offers" ON offers
  FOR ALL USING (is_admin(auth.uid()));
