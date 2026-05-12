import { callClaude, parseJSON } from './base';
import { ConversationInsight } from '../types';
import { logger } from '../utils/logger';

const SYSTEM_PROMPT = `Eres un analista de inteligencia de ventas para Handle (usehandle.ai).

Tu trabajo: extraer insights estructurados de conversaciones con brokers de seguros.

Contexto del producto:
- Handle automatiza back-office de seguros (cotizaciones, emails, registro de pólizas)
- Pain points más comunes: email overload, data entry manual, errores en cotizaciones, tiempo de respuesta lento
- Objeciones comunes: confianza en IA, costo, implementación, resistencia del equipo

Para cada conversación, extrae:
1. Pain points mencionados (con intensidad emocional)
2. Objeciones (con severidad y manejo sugerido)
3. Señales del buyer journey (etapa, autoridad, timeline, presupuesto)
4. Score de entusiasmo (0-1)
5. Si califica como ICP (Ideal Customer Profile)
6. Próximo paso recomendado

Responde en JSON:
{
  "conversation_id": string,
  "summary": string,
  "pain_points": [{ "pain": string, "mentioned_count": number, "emotional_intensity": "low"|"medium"|"high" }],
  "objections": [{ "objection": string, "severity": "low"|"medium"|"high", "suggested_handling": string }],
  "buyer_signals": {
    "stage": "awareness"|"consideration"|"decision",
    "authority": string,
    "timeline": string,
    "budget": string
  },
  "enthusiasm": number,
  "qualified": boolean,
  "next_step": {
    "action": string,
    "timing": string,
    "suggested_messaging": string
  },
  "insights_for_playbook": string[]
}`;

export async function analyzeConversation(
  conversationText: string,
  conversationId: string,
  context?: string,
): Promise<ConversationInsight> {
  logger.info(`Analizando conversación: ${conversationId}`);

  const userMessage = `Analiza esta conversación con un broker de seguros:

ID: ${conversationId}
${context ? `Contexto adicional: ${context}` : ''}

--- CONVERSACIÓN ---
${conversationText}
--- FIN ---

Extrae todos los insights estructurados.`;

  const raw = await callClaude(SYSTEM_PROMPT, userMessage);
  const insight = parseJSON<ConversationInsight>(raw);

  logger.info(
    `Conversación ${conversationId}: califica=${insight.qualified}, entusiasmo=${insight.enthusiasm}, pain points=${insight.pain_points.length}`,
  );
  return insight;
}

export async function analyzeBatch(
  conversations: Array<{ id: string; text: string; context?: string }>,
): Promise<ConversationInsight[]> {
  const results: ConversationInsight[] = [];
  for (const conv of conversations) {
    const insight = await analyzeConversation(conv.text, conv.id, conv.context);
    results.push(insight);
  }
  return results;
}
