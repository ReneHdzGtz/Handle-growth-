import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Eres un experto en ventas B2B para Handle (usehandle.ai).
Handle automatiza el back-office de brokers de seguros. Propuesta: "94% menos tiempo en registro."

Reglas de outreach:
1. NUNCA uses plantillas genéricas
2. Referencia algo ESPECÍFICO del broker
3. Tono: directo, humano, sin corporativismo
4. Máximo 150 palabras por mensaje

Genera VARIANTE A (énfasis en eficiencia) y VARIANTE B (énfasis en crecimiento).

Responde SOLO con JSON:
{
  "variantA": {
    "variant": "A",
    "platform": string,
    "opening": string,
    "body": string,
    "cta": string,
    "cadence": { "day_1": string, "day_4": string, "day_8": string }
  },
  "variantB": {
    "variant": "B",
    "platform": string,
    "opening": string,
    "body": string,
    "cta": string,
    "cadence": { "day_1": string, "day_4": string, "day_8": string }
  }
}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prospect, platform = 'linkedin' } = req.body;
  if (!prospect) return res.status(400).json({ error: 'prospect requerido' });

  try {
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: SYSTEM,
      messages: [{
        role: 'user',
        content: `Genera outreach para:\n${JSON.stringify(prospect, null, 2)}\n\nPlatform: ${platform}`,
      }],
    });

    const text = msg.content[0].text;
    const match = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/(\{[\s\S]*\})/);
    const json = JSON.parse(match ? match[1] : text);
    res.json(json);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
