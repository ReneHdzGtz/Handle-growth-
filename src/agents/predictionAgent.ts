import { callClaude, parseJSON } from './base';
import { DealPrediction } from '../types';
import { logger } from '../utils/logger';

const SYSTEM_PROMPT = `Eres el motor de predicción y alertas para el pipeline de ventas de Handle.

Tu trabajo: analizar el estado de deals activos y predecir probabilidades de cierre,
detectar deals que se están enfriando, y recomendar intervenciones específicas.

Señales de deal saludable:
- Respuesta en < 3 días
- Avance de stage en < 2 semanas
- Múltiples contactos en la empresa
- Preguntas técnicas (señal de evaluación activa)

Señales de deal en riesgo:
- Sin actividad 5+ días
- Mismo stage 3+ semanas
- Solo 1 contacto (single-threaded)
- Objeciones de precio sin resolver

Responde en JSON:
{
  "deals": [
    {
      "deal_id": string,
      "prospect": string,
      "stage": string,
      "closure_probability": number (0-1),
      "estimated_close_date": string | null,
      "alerts": [{ "type": string, "severity": "low"|"medium"|"high", "message": string, "recommendation": string }],
      "recommendation": string
    }
  ],
  "forecast": {
    "deals_in_pipeline": number,
    "expected_closes_30d": number,
    "expected_closes_90d": number,
    "implied_run_rate": string
  },
  "priority_actions": string[]
}`;

export interface DealData {
  id: string;
  prospect_name: string;
  company: string;
  stage: string;
  days_in_stage: number;
  days_since_last_activity: number;
  activity_count: number;
  value_estimated?: number;
  notes?: string;
}

export async function predictDeals(deals: DealData[]): Promise<{
  predictions: DealPrediction[];
  forecast: Record<string, unknown>;
  priority_actions: string[];
}> {
  logger.info(`Prediciendo ${deals.length} deals...`);

  const userMessage = `Analiza estos deals activos y genera predicciones de cierre + alertas:

${JSON.stringify(deals, null, 2)}

Fecha de análisis: ${new Date().toISOString().split('T')[0]}`;

  const raw = await callClaude(SYSTEM_PROMPT, userMessage);
  const result = parseJSON<{
    deals: DealPrediction[];
    forecast: Record<string, unknown>;
    priority_actions: string[];
  }>(raw);

  const stalledDeals = result.deals.filter((d) => d.alerts.some((a) => a.severity === 'high'));
  if (stalledDeals.length > 0) {
    logger.warn(`${stalledDeals.length} deals necesitan atención urgente`);
  }

  return {
    predictions: result.deals,
    forecast: result.forecast,
    priority_actions: result.priority_actions,
  };
}
