CREATE TABLE invite_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'client' CHECK (role IN ('client','admin')),
  plan_type TEXT DEFAULT 'performance' CHECK (plan_type IN ('performance','scaling','enterprise')),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_by UUID REFERENCES clients(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invite_tokens_token ON invite_tokens(token);
CREATE INDEX idx_invite_tokens_email ON invite_tokens(email);

ALTER TABLE invite_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage invites" ON invite_tokens
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM clients WHERE role = 'admin'));

CREATE POLICY "Users can insert own client data" ON clients
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);
