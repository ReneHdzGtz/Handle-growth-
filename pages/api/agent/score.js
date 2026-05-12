import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Eres un especialista en generación de leads B2B para Handle (usehandle.ai),
una plataforma de IA para automatizar back-office de brokers de seguros en Latinoamérica.

Analiza prospectos y asigna un score de receptividad (0-1) basado en:
- Tamaño de empresa (10-100 empleados = ideal): +0.3
- Rol del contacto (Operations, CEO, Dueño): +0.2
- Señales de crecimiento: +0.2
- Actividad digital / tech-friendly: +0.15
- Presupuesto estimado >$500/mes: +0.15

Responde SOLO con JSON válido:
{
  "leads": [{
    "name": string,
    "company": string,
    "title": string,
    "receptiveness_score": number,
    "estimated_budget": string,
    "why_qualified": string,
    "next_action": string,
    "priority": number
  }]
}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prospects } = req.body;
  if (!prospects?.length) return res.status(400).json({ error: 'prospects requerido' });

  try {
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: SYSTEM,
      messages: [{ role: 'user', content: `Analiza estos prospectos:\n${JSON.stringify(prospects, null, 2)}` }],
    });

    const text = msg.content[0].text;
    const match = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/(\{[\s\S]*\})/);
    const json = JSON.parse(match ? match[1] : text);
    res.json(json);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
