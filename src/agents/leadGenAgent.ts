import { callClaude, parseJSON } from './base';
import { LeadScoringResult, ScoredLead } from '../types';
import { logger } from '../utils/logger';

const SYSTEM_PROMPT = `Eres un especialista en generación de leads B2B para Handle (usehandle.ai),
una plataforma de IA para automatizar back-office de brokers de seguros en Latinoamérica.

Handle resuelve: 94% reducción de tiempo en registro, automatización de cotizaciones y emails.
Clientes ideales: Brokers de seguros con 5-100 personas, en México (primero), Colombia, Perú.

Tu tarea es analizar datos de prospectos y asignarles un score de receptividad (0-1).

Criterios de scoring:
- Tamaño de empresa (10-100 empleados = ideal): +0.3
- Rol del contacto (Operations, CEO, Dueño): +0.2
- Señales de crecimiento reciente: +0.2
- Actividad digital (LinkedIn activo, tech-friendly): +0.15
- Presupuesto estimado >$500/mes: +0.15

Responde SIEMPRE en JSON válido con este esquema:
{
  "leads": [
    {
      "name": string,
      "company": string,
      "title": string,
      "location": string,
      "receptiveness_score": number (0-1),
      "estimated_budget": string,
      "why_qualified": string,
      "next_action": string,
      "priority": number (1=highest)
    }
  ]
}`;

export interface RawProspect {
  name: string;
  company: string;
  title: string;
  location: string;
  linkedin_url?: string;
  company_size?: string;
  notes?: string;
}

export async function scoreLeads(prospects: RawProspect[]): Promise<ScoredLead[]> {
  logger.info(`Scoring ${prospects.length} prospectos...`);

  const userMessage = `Analiza estos prospectos y devuelve un score de receptividad para cada uno:

${JSON.stringify(prospects, null, 2)}

Ordena por prioridad (1 = más receptivo). Incluye razonamiento en why_qualified.`;

  const raw = await callClaude(SYSTEM_PROMPT, userMessage);
  const result = parseJSON<LeadScoringResult>(raw);

  logger.info(`Leads scored: ${result.leads.length} procesados`);
  return result.leads;
}

export async function findTopLeads(allLeads: ScoredLead[], threshold = 0.7, limit = 30): Promise<ScoredLead[]> {
  return allLeads
    .filter((l) => l.receptiveness_score >= threshold)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}
