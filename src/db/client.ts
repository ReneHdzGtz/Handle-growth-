import { Pool } from 'pg';
import { logger } from '../utils/logger';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => logger.error('DB pool error', err));

export const db = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: (text: string, params?: unknown[]) =>
    pool.query(text, params),

  // Prospectos
  insertProspect: (data: Record<string, unknown>) =>
    pool.query(
      `INSERT INTO prospects (name, company, title, location, linkedin_url, email, receptiveness_score, estimated_budget, qualified, source, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [data.name, data.company, data.title, data.location, data.linkedin_url,
       data.email, data.receptiveness_score, data.estimated_budget, data.qualified,
       data.source || 'manual', data.notes],
    ),

  getProspects: (limit = 50, offset = 0) =>
    pool.query('SELECT * FROM prospects ORDER BY receptiveness_score DESC LIMIT $1 OFFSET $2', [limit, offset]),

  // Interacciones
  insertInteraction: (data: Record<string, unknown>) =>
    pool.query(
      `INSERT INTO interactions (prospect_id, type, direction, content, pain_points, objections, enthusiasm_score, qualified, next_step, raw_insight)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [data.prospect_id, data.type, data.direction, data.content,
       JSON.stringify(data.pain_points || []), JSON.stringify(data.objections || []),
       data.enthusiasm_score, data.qualified, data.next_step, JSON.stringify(data.raw_insight)],
    ),

  getInteractionsByProspect: (prospect_id: string) =>
    pool.query('SELECT * FROM interactions WHERE prospect_id = $1 ORDER BY created_at DESC', [prospect_id]),

  getRecentInteractions: (limit = 30) =>
    pool.query('SELECT i.*, p.name, p.company FROM interactions i JOIN prospects p ON p.id = i.prospect_id ORDER BY i.created_at DESC LIMIT $1', [limit]),

  // Deals
  upsertDeal: (data: Record<string, unknown>) =>
    pool.query(
      `INSERT INTO deals (prospect_id, stage, value_estimated, probability, health_score, last_activity_at)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (prospect_id) DO UPDATE SET stage=$2, probability=$4, health_score=$5, last_activity_at=$6, updated_at=NOW()
       RETURNING *`,
      [data.prospect_id, data.stage, data.value_estimated, data.probability, data.health_score, new Date()],
    ),

  getActiveDeals: () =>
    pool.query(
      `SELECT d.*, p.name, p.company FROM deals d
       JOIN prospects p ON p.id = d.prospect_id
       WHERE d.won IS NULL ORDER BY d.probability DESC`,
    ),

  // Playbook
  insertPlaybook: (data: Record<string, unknown>) =>
    pool.query(
      `INSERT INTO playbook_versions (version, positioning, pain_points, objections, messaging, confidence_scores, conversations_analyzed)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [data.version, JSON.stringify(data.positioning), JSON.stringify(data.pain_points),
       JSON.stringify(data.objections), JSON.stringify(data.messaging),
       JSON.stringify(data.confidence_scores), data.conversations_analyzed],
    ),

  getLatestPlaybook: () =>
    pool.query('SELECT * FROM playbook_versions ORDER BY created_at DESC LIMIT 1'),

  // Outreach
  insertOutreach: (data: Record<string, unknown>) =>
    pool.query(
      `INSERT INTO outreach_messages (prospect_id, variant, platform, message_opening, message_body, message_cta, cadence)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [data.prospect_id, data.variant, data.platform, data.message_opening,
       data.message_body, data.message_cta, JSON.stringify(data.cadence)],
    ),

  // Agent runs
  logAgentRun: (name: string, inputSummary: string) =>
    pool.query(
      'INSERT INTO agent_runs (agent_name, status, input_summary) VALUES ($1,$2,$3) RETURNING id',
      [name, 'running', inputSummary],
    ),

  completeAgentRun: (id: string, outputSummary: string, durationMs: number, tokensUsed?: number) =>
    pool.query(
      `UPDATE agent_runs SET status='completed', output_summary=$2, duration_ms=$3, tokens_used=$4, completed_at=NOW()
       WHERE id=$1`,
      [id, outputSummary, durationMs, tokensUsed],
    ),
};
