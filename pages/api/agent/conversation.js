import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Eres un analista de inteligencia de ventas para Handle (usehandle.ai).

Extrae insights estructurados de conversaciones con brokers de seguros.
Pain points comunes: email overload, data entry manual, errores en cotizaciones, tiempo de respuesta.
Objeciones comunes: confianza en IA, costo, implementación.

Responde SOLO con JSON:
{
  "summary": string,
  "pain_points": [{ "pain": string, "emotional_intensity": "low"|"medium"|"high" }],
  "objections": [{ "objection": string, "severity": "low"|"medium"|"high", "suggested_handling": string }],
  "buyer_signals": { "stage": "awareness"|"consideration"|"decision", "authority": string, "timeline": string, "budget": string },
  "enthusiasm": number,
  "qualified": boolean,
  "next_step": { "action": string, "timing": string, "suggested_messaging": string }
}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text, context } = req.body;
  if (!text) return res.status(400).json({ error: 'text requerido' });

  try {
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: SYSTEM,
      messages: [{
        role: 'user',
        content: `Analiza esta conversación con un broker:\n\n${text}${context ? `\n\nContexto: ${context}` : ''}`,
      }],
    });

    const raw = msg.content[0].text;
    const match = raw.match(/```json\n?([\s\S]*?)\n?```/) || raw.match(/(\{[\s\S]*\})/);
    const json = JSON.parse(match ? match[1] : raw);
    res.json(json);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
