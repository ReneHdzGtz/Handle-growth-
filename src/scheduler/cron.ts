import cron from 'node-cron';
import { db } from '../db/client';
import { generatePlaybook } from '../agents/playbookAgent';
import { predictDeals } from '../agents/predictionAgent';
import { sendDailyDigest, sendPlaybookUpdate, sendAlert } from '../integrations/slack';
import { logger } from '../utils/logger';

export function startScheduler(): void {
  logger.info('Iniciando scheduler de agentes...');

  // --- DIARIO 6 AM: Digest + alertas de deals ---
  cron.schedule(process.env.DAILY_DIGEST_CRON || '0 6 * * *', async () => {
    logger.info('[CRON] Ejecutando daily digest...');
    try {
      const recentInteractions = await db.getRecentInteractions(10);
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
      }));

      let stalledDeals: string[] = [];
      if (dealData.length > 0) {
        const predictions = await predictDeals(dealData);
        stalledDeals = predictions.predictions
          .filter((p) => p.alerts.some((a) => a.severity === 'high'))
          .map((p) => p.prospect);
      }

      await sendDailyDigest({
        newInteractions: recentInteractions.rows.length,
        stalledDeals,
        topInsight: recentInteractions.rows[0]?.next_step || undefined,
      });

      logger.info('[CRON] Daily digest completado');
    } catch (err) {
      logger.error('[CRON] Error en daily digest:', err);
      await sendAlert('Error en daily digest — revisar logs', 'critical');
    }
  });

  // --- LUNES 8 AM: Generar nueva versión del playbook ---
  cron.schedule(process.env.WEEKLY_PLAYBOOK_CRON || '0 8 * * 1', async () => {
    logger.info('[CRON] Ejecutando generación semanal de playbook...');
    try {
      const interactionsResult = await db.getRecentInteractions(50);
      const rawInsights = interactionsResult.rows.map((r) => r.raw_insight).filter(Boolean);

      if (rawInsights.length < 3) {
        logger.info(`[CRON] Solo ${rawInsights.length} insights, esperando más conversaciones`);
        return;
      }

      const latestPlaybook = await db.getLatestPlaybook();
      const playbook = await generatePlaybook(rawInsights, latestPlaybook.rows[0]?.version);
      await db.insertPlaybook(playbook as unknown as Record<string, unknown>);

      const topPain = playbook.pain_points[0]?.pain || 'N/A';
      await sendPlaybookUpdate(playbook.version, topPain);

      logger.info(`[CRON] Playbook ${playbook.version} generado y guardado`);
    } catch (err) {
      logger.error('[CRON] Error generando playbook:', err);
      await sendAlert('Error generando playbook semanal', 'warning');
    }
  });

  // --- 1 y 15 de cada mes: Predicción bi-semanal ---
  cron.schedule(process.env.BIWEEKLY_OUTREACH_CRON || '0 8 1,15 * *', async () => {
    logger.info('[CRON] Ejecutando predicción bi-semanal...');
    try {
      const activeDeals = await db.getActiveDeals();
      if (!activeDeals.rows.length) {
        logger.info('[CRON] Sin deals activos');
        return;
      }

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
      }));

      const predictions = await predictDeals(dealData);
      const criticalDeals = predictions.predictions.filter((p) => p.closure_probability < 0.3);

      if (criticalDeals.length > 0) {
        await sendAlert(
          `${criticalDeals.length} deals con probabilidad <30%: ${criticalDeals.map((d) => d.prospect).join(', ')}`,
          'warning',
        );
      }

      logger.info(`[CRON] Predicción bi-semanal: ${predictions.predictions.length} deals analizados`);
    } catch (err) {
      logger.error('[CRON] Error en predicción bi-semanal:', err);
    }
  });

  logger.info('Scheduler iniciado: 3 jobs activos (daily, weekly, biweekly)');
}
