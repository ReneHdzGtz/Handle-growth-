import { Router, Request, Response } from 'express';
import { db } from '../db/client';
import { scoreLeads } from '../agents/leadGenAgent';
import { generateOutreach } from '../agents/outreachAgent';
import { analyzeConversation } from '../agents/conversationAgent';
import { generatePlaybook } from '../agents/playbookAgent';
import { predictDeals } from '../agents/predictionAgent';
import { searchBrokers } from '../integrations/apollo';
import { logger } from '../utils/logger';

const router = Router();

// ---- HEALTH ----
router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', version: '2.0.0', timestamp: new Date().toISOString() });
});

// ---- PROSPECTS ----
router.get('/prospects', async (_req: Request, res: Response) => {
  const result = await db.getProspects(50, 0);
  res.json({ prospects: result.rows, total: result.rowCount });
});

router.post('/prospects/score', async (req: Request, res: Response) => {
  const { prospects } = req.body;
  if (!prospects?.length) return res.status(400).json({ error: 'prospects requerido' });

  const scored = await scoreLeads(prospects);
  for (const lead of scored) {
    await db.insertProspect({
      ...lead,
      qualified: lead.receptiveness_score >= 0.7,
      source: 'manual',
    });
  }
  res.json({ scored, total: scored.length });
});

router.post('/prospects/search', async (req: Request, res: Response) => {
  const params = req.body;
  const rawLeads = await searchBrokers(params);
  const scored = await scoreLeads(rawLeads);

  for (const lead of scored) {
    await db.insertProspect({ ...lead, qualified: lead.receptiveness_score >= 0.7, source: 'apollo' });
  }
  res.json({ found: rawLeads.length, scored, qualified: scored.filter((l) => l.receptiveness_score >= 0.7).length });
});

// ---- OUTREACH ----
router.post('/outreach/generate', async (req: Request, res: Response) => {
  const { prospect_id, platform } = req.body;
  if (!prospect_id) return res.status(400).json({ error: 'prospect_id requerido' });

  const prospectsResult = await db.query('SELECT * FROM prospects WHERE id = $1', [prospect_id]);
  if (!prospectsResult.rows.length) return res.status(404).json({ error: 'Prospecto no encontrado' });

  const prospect = prospectsResult.rows[0];
  const { variantA, variantB } = await generateOutreach(prospect, prospect_id, platform || 'linkedin');

  await db.insertOutreach({
    prospect_id,
    variant: 'A',
    platform: platform || 'linkedin',
    message_opening: variantA.message.opening,
    message_body: variantA.message.body,
    message_cta: variantA.message.cta,
    cadence: variantA.cadence,
  });
  await db.insertOutreach({
    prospect_id,
    variant: 'B',
    platform: platform || 'linkedin',
    message_opening: variantB.message.opening,
    message_body: variantB.message.body,
    message_cta: variantB.message.cta,
    cadence: variantB.cadence,
  });

  res.json({ variantA, variantB });
});

// ---- CONVERSATION INTELLIGENCE ----
router.post('/conversations/analyze', async (req: Request, res: Response) => {
  const { prospect_id, content, type, direction, context } = req.body;
  if (!prospect_id || !content) return res.status(400).json({ error: 'prospect_id y content requeridos' });

  const conversationId = `conv_${prospect_id}_${Date.now()}`;
  const insight = await analyzeConversation(content, conversationId, context);

  await db.insertInteraction({
    prospect_id,
    type: type || 'email',
    direction: direction || 'inbound',
    content,
    pain_points: insight.pain_points.map((p) => p.pain),
    objections: insight.objections.map((o) => o.objection),
    enthusiasm_score: insight.enthusiasm,
    qualified: insight.qualified,
    next_step: insight.next_step.action,
    raw_insight: insight,
  });

  res.json({ insight, conversation_id: conversationId });
});

router.get('/conversations', async (_req: Request, res: Response) => {
  const result = await db.getRecentInteractions(30);
  res.json({ interactions: result.rows });
});

// ---- PLAYBOOK ----
router.get('/playbook/latest', async (_req: Request, res: Response) => {
  const result = await db.getLatestPlaybook();
  if (!result.rows.length) return res.status(404).json({ error: 'Sin playbook aún. Corre /playbook/generate primero.' });
  res.json({ playbook: result.rows[0] });
});

router.post('/playbook/generate', async (req: Request, res: Response) => {
  const interactionsResult = await db.getRecentInteractions(50);
  const rawInsights = interactionsResult.rows.map((r) => r.raw_insight).filter(Boolean);

  if (rawInsights.length < 3) {
    return res.status(400).json({ error: `Necesitas al menos 3 conversaciones analizadas. Tienes ${rawInsights.length}.` });
  }

  const latestPlaybook = await db.getLatestPlaybook();
  const currentVersion = latestPlaybook.rows[0]?.version;

  const playbook = await generatePlaybook(rawInsights, currentVersion);
  await db.insertPlaybook(playbook as unknown as Record<string, unknown>);

  logger.info(`Playbook ${playbook.version} guardado`);
  res.json({ playbook, message: `Playbook v${playbook.version} generado con ${rawInsights.length} conversaciones` });
});

// ---- DEALS & PREDICTIONS ----
router.get('/deals', async (_req: Request, res: Response) => {
  const result = await db.getActiveDeals();
  res.json({ deals: result.rows });
});

router.post('/deals/predict', async (req: Request, res: Response) => {
  const activeDeals = await db.getActiveDeals();

  const dealData = activeDeals.rows.map((d) => ({
    id: d.id,
    prospect_name: d.name,
    company: d.company,
    stage: d.stage,
    days_in_stage: Math.floor((Date.now() - new Date(d.updated_at).getTime()) / 86400000),
    days_since_last_activity: d.last_activity_at
      ? Math.floor((Date.now() - new Date(d.last_activity_at).getTime()) / 86400000)
      : 99,
    activity_count: 1,
    value_estimated: d.value_estimated,
  }));

  if (!dealData.length) return res.json({ message: 'Sin deals activos', predictions: [], forecast: {} });

  const predictions = await predictDeals(dealData);
  res.json(predictions);
});

// ---- DASHBOARD STATS ----
router.get('/stats', async (_req: Request, res: Response) => {
  const [prospects, deals, playbook, interactions] = await Promise.all([
    db.query('SELECT COUNT(*) as total, AVG(receptiveness_score) as avg_score FROM prospects'),
    db.query('SELECT stage, COUNT(*) as count FROM deals WHERE won IS NULL GROUP BY stage'),
    db.getLatestPlaybook(),
    db.query('SELECT COUNT(*) as total FROM interactions WHERE created_at > NOW() - INTERVAL \'7 days\''),
  ]);

  res.json({
    prospects: { total: prospects.rows[0].total, avg_score: parseFloat(String(prospects.rows[0].avg_score || 0)).toFixed(2) },
    pipeline: deals.rows,
    playbook_version: playbook.rows[0]?.version || 'No generado',
    interactions_last_7d: interactions.rows[0].total,
  });
});

export { router };
