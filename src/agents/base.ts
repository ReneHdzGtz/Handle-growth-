import Anthropic from '@anthropic-ai/sdk';
import { logger } from '../utils/logger';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function callClaude(
  systemPrompt: string,
  userMessage: string,
  model = 'claude-sonnet-4-6',
): Promise<string> {
  const response = await anthropic.messages.create({
    model,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Respuesta inesperada de Claude');

  logger.debug(`Tokens usados: ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`);
  return content.text;
}

export function parseJSON<T>(raw: string): T {
  const match = raw.match(/```json\n?([\s\S]*?)\n?```/) || raw.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  const jsonStr = match ? match[1] : raw;
  return JSON.parse(jsonStr) as T;
}
