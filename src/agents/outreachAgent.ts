import { callClaude, parseJSON } from './base';
import { OutreachResult, ScoredLead } from '../types';
import { logger } from '../utils/logger';

const SYSTEM_PROMPT = `Eres un experto en ventas B2B para Handle (usehandle.ai).

Handle es una plataforma de IA que automatiza el back-office de brokers de seguros.
Propuesta de valor clave: "94% menos tiempo en registro. Tus brokers se enfocan en vender."

Reglas de outreach:
1. NUNCA uses plantillas genéricas (sin "Hola [Nombre]")
2. Referencia algo ESPECÍFICO del broker (empresa, rol, industria)
3. El pain point debe resonar con su día a día real
4. CTA claro y de bajo compromiso (15 min, no "demo completo")
5. Tono: directo, humano, sin corporativismo
6. Máximo 150 palabras por mensaje

Genera siempre VARIANTE A y VARIANTE B (A/B test):
- A: Énfasis en ahorro de tiempo/eficiencia operacional
- B: Énfasis en crecimiento y escala del negocio

Responde en JSON:
{
  "prospect_id": string,
  "variant": "A" | "B",
  "platform": "linkedin" | "email",
  "message": {
    "opening": string,
    "body": string,
    "cta": string
  },
  "cadence": {
    "day_1": string,
    "day_4": string,
    "day_8": string,
    "day_12": string
  }
}`;

export async function generateOutreach(
  lead: ScoredLead,
  prospectId: string,
  platform: 'linkedin' | 'email' = 'linkedin',
): Promise<{ variantA: OutreachResult; variantB: OutreachResult }> {
  logger.info(`Generando outreach para: ${lead.name} @ ${lead.company}`);

  const userMessage = `Genera outreach para este prospecto:
${JSON.stringify(lead, null, 2)}

Platform: ${platform}
prospect_id: ${prospectId}

Devuelve DOS variantes en un JSON así:
{
  "variantA": { ...la estructura de arriba... },
  "variantB": { ...la estructura de arriba... }
}`;

  const raw = await callClaude(SYSTEM_PROMPT, userMessage);
  const result = parseJSON<{ variantA: OutreachResult; variantB: OutreachResult }>(raw);

  logger.info(`Outreach generado para ${lead.name}: ${result.variantA.message.opening.slice(0, 50)}...`);
  return result;
}

export async function generateBatchOutreach(
  leads: ScoredLead[],
  platform: 'linkedin' | 'email' = 'linkedin',
): Promise<Array<{ leadId: string; variantA: OutreachResult; variantB: OutreachResult }>> {
  const results = [];
  for (const lead of leads) {
    const id = `prospect_${lead.company.toLowerCase().replace(/\s/g, '_')}`;
    const outreach = await generateOutreach(lead, id, platform);
    results.push({ leadId: id, ...outreach });
  }
  return results;
}
