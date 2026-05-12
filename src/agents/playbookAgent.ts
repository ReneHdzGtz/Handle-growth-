import { callClaude, parseJSON } from './base';
import { PlaybookVersion, ConversationInsight } from '../types';
import { logger } from '../utils/logger';

const SYSTEM_PROMPT = `Eres el sistema de inteligencia de playbook para Handle (usehandle.ai).

Tu rol: agregar insights de múltiples conversaciones con brokers y generar/actualizar el playbook de ventas.

El playbook debe contener:
1. Positioning principal (con confianza basada en datos)
2. Top pain points rankeados (cuáles mencionar primero)
3. Biblioteca de manejo de objeciones (respuestas que funcionan)
4. Resultados de A/B testing de mensajes
5. Performance por canal (LinkedIn vs Email)
6. Próximas acciones recomendadas

Reglas de confianza:
- 1-3 conversaciones: confianza máx 0.5 (señal, no patrón)
- 4-8 conversaciones: confianza 0.5-0.75 (patrón emergente)
- 9+ conversaciones: confianza >0.75 (patrón validado)

Responde en JSON con este esquema exacto:
{
  "playbook_version": string,
  "generated_date": string,
  "conversations_analyzed": number,
  "confidence_threshold": number,
  "core_positioning": { "statement": string, "confidence": number, "data_points": number },
  "top_pain_points": [{ "rank": number, "pain": string, "mentions": string, "confidence": number, "messaging_suggestion": string }],
  "objection_library": [{ "objection": string, "frequency": string, "recommended_response": string, "handling_effectiveness": number }],
  "messaging_experiments": { "variants": [{ "variant": string, "positioning": string, "response_rate": number, "advance_rate": number }], "winner": string },
  "channel_performance": { "LinkedIn": { "messages_sent": number, "responses": number, "conversion_rate": number }, "Email": { "messages_sent": number, "responses": number, "conversion_rate": number } },
  "next_actions": string[]
}`;

export async function generatePlaybook(
  insights: ConversationInsight[],
  currentVersion?: string,
  channelData?: Record<string, unknown>,
): Promise<PlaybookVersion> {
  logger.info(`Generando playbook v${currentVersion || '1.0'} con ${insights.length} conversaciones...`);

  const nextVersion = bumpVersion(currentVersion || '0.9');

  const userMessage = `Genera el playbook v${nextVersion} basado en estas ${insights.length} conversaciones:

${JSON.stringify(insights, null, 2)}

${channelData ? `Datos de canal adicionales: ${JSON.stringify(channelData)}` : ''}

Versión anterior: ${currentVersion || 'N/A (primera versión)'}
Nueva versión: ${nextVersion}
Fecha: ${new Date().toISOString().split('T')[0]}

Identifica patrones, asigna confianza, y genera recomendaciones accionables.`;

  const raw = await callClaude(SYSTEM_PROMPT, userMessage);
  const playbookData = parseJSON<Record<string, unknown>>(raw);

  const playbook: PlaybookVersion = {
    id: crypto.randomUUID(),
    version: nextVersion,
    positioning: playbookData.core_positioning as Record<string, unknown>,
    pain_points: playbookData.top_pain_points as PlaybookVersion['pain_points'],
    objections: playbookData.objection_library as PlaybookVersion['objections'],
    messaging: playbookData.messaging_experiments as Record<string, unknown>,
    confidence_scores: extractConfidenceScores(playbookData),
    conversations_analyzed: insights.length,
    created_at: new Date(),
  };

  logger.info(`Playbook ${nextVersion} generado. Pain points identificados: ${playbook.pain_points.length}`);
  return playbook;
}

function bumpVersion(version: string): string {
  const parts = version.split('.').map(Number);
  parts[1] = (parts[1] || 0) + 1;
  return parts.join('.');
}

function extractConfidenceScores(data: Record<string, unknown>): Record<string, number> {
  const scores: Record<string, number> = {};
  const positioning = data.core_positioning as { confidence?: number } | undefined;
  if (positioning?.confidence) scores['positioning'] = positioning.confidence;
  const painPoints = data.top_pain_points as Array<{ pain?: string; confidence?: number }> | undefined;
  if (Array.isArray(painPoints)) {
    painPoints.forEach((pp) => {
      if (pp.pain && pp.confidence) scores[`pain_${pp.pain.slice(0, 20)}`] = pp.confidence;
    });
  }
  return scores;
}
