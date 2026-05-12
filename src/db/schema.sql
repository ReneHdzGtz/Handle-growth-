-- Handle Growth Agent V2 — Schema PostgreSQL
-- Ejecuta esto en Supabase o en tu PostgreSQL propio

-- Habilita UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Prospectos / Brokers objetivo
CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  title TEXT,
  location TEXT,
  linkedin_url TEXT,
  email TEXT,
  receptiveness_score FLOAT DEFAULT 0,
  estimated_budget TEXT,
  qualified BOOLEAN DEFAULT FALSE,
  source TEXT DEFAULT 'manual', -- 'apollo', 'manual', 'linkedin'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interacciones (emails, calls, mensajes)
CREATE TABLE IF NOT EXISTS interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('email', 'call', 'linkedin_msg', 'demo')) NOT NULL,
  direction TEXT CHECK (direction IN ('inbound', 'outbound')) NOT NULL,
  content TEXT NOT NULL,
  pain_points JSONB DEFAULT '[]',
  objections JSONB DEFAULT '[]',
  enthusiasm_score FLOAT DEFAULT 0,
  qualified BOOLEAN DEFAULT FALSE,
  next_step TEXT,
  raw_insight JSONB,           -- respuesta completa del agente
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deals / Pipeline
CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  stage TEXT CHECK (stage IN ('awareness', 'consideration', 'decision', 'implementation')) NOT NULL DEFAULT 'awareness',
  value_estimated DECIMAL(12,2),
  probability FLOAT DEFAULT 0.1,
  expected_close_date DATE,
  health_score FLOAT DEFAULT 0.5,
  closure_probability FLOAT DEFAULT 0.1,
  last_activity_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  won BOOLEAN,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Versiones del Playbook
CREATE TABLE IF NOT EXISTS playbook_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version TEXT NOT NULL UNIQUE,
  positioning JSONB NOT NULL DEFAULT '{}',
  pain_points JSONB NOT NULL DEFAULT '[]',
  objections JSONB NOT NULL DEFAULT '[]',
  messaging JSONB NOT NULL DEFAULT '{}',
  confidence_scores JSONB NOT NULL DEFAULT '{}',
  conversations_analyzed INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mensajes de outreach generados
CREATE TABLE IF NOT EXISTS outreach_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  variant TEXT CHECK (variant IN ('A', 'B')) NOT NULL,
  platform TEXT CHECK (platform IN ('linkedin', 'email')) NOT NULL,
  message_opening TEXT,
  message_body TEXT,
  message_cta TEXT,
  cadence JSONB,
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  response_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Log de ejecuciones de agentes (para auditoría)
CREATE TABLE IF NOT EXISTS agent_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_name TEXT NOT NULL,
  status TEXT CHECK (status IN ('running', 'completed', 'failed')) NOT NULL DEFAULT 'running',
  input_summary TEXT,
  output_summary TEXT,
  error_message TEXT,
  tokens_used INT,
  duration_ms INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_prospects_score ON prospects(receptiveness_score DESC);
CREATE INDEX IF NOT EXISTS idx_interactions_prospect ON interactions(prospect_id);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage);
CREATE INDEX IF NOT EXISTS idx_deals_prospect ON deals(prospect_id);
CREATE INDEX IF NOT EXISTS idx_outreach_prospect ON outreach_messages(prospect_id);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prospects_updated_at BEFORE UPDATE ON prospects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER deals_updated_at BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
