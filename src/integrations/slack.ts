import axios from 'axios';
import { logger } from '../utils/logger';

const WEBHOOK = process.env.SLACK_WEBHOOK_URL;
const CHANNEL = process.env.SLACK_CHANNEL || '#handle-growth';

export async function sendSlackMessage(text: string, blocks?: unknown[]): Promise<void> {
  if (!WEBHOOK) {
    logger.warn('SLACK_WEBHOOK_URL no configurado, saltando notificación');
    return;
  }
  await axios.post(WEBHOOK, { text, blocks, channel: CHANNEL });
}

export async function sendDailyDigest(data: {
  newInteractions: number;
  stalledDeals: string[];
  topInsight?: string;
}): Promise<void> {
  const blocks = [
    { type: 'header', text: { type: 'plain_text', text: '📊 Handle Growth — Daily Digest' } },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*Nuevas interacciones:*\n${data.newInteractions}` },
        { type: 'mrkdwn', text: `*Deals en riesgo:*\n${data.stalledDeals.length}` },
      ],
    },
    data.topInsight
      ? { type: 'section', text: { type: 'mrkdwn', text: `💡 *Insight del día:* ${data.topInsight}` } }
      : null,
    data.stalledDeals.length > 0
      ? {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `⚠️ *Deals que necesitan atención:*\n${data.stalledDeals.map((d) => `• ${d}`).join('\n')}`,
          },
        }
      : null,
  ].filter(Boolean);

  await sendSlackMessage('Daily Digest', blocks);
  logger.info('Slack daily digest enviado');
}

export async function sendPlaybookUpdate(version: string, topInsight: string): Promise<void> {
  await sendSlackMessage(
    `🎯 Playbook ${version} generado`,
    [
      { type: 'header', text: { type: 'plain_text', text: `🎯 Playbook v${version} actualizado` } },
      { type: 'section', text: { type: 'mrkdwn', text: `*Top insight:* ${topInsight}` } },
    ],
  );
}

export async function sendAlert(message: string, severity: 'info' | 'warning' | 'critical'): Promise<void> {
  const emoji = { info: 'ℹ️', warning: '⚠️', critical: '🚨' }[severity];
  await sendSlackMessage(`${emoji} ${message}`);
}
