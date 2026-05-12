import axios from 'axios';
import { logger } from '../utils/logger';

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const FROM = process.env.EMAIL_FROM || 'growth@handle.dev';
const BASE_URL = `https://api.mailgun.net/v3/${DOMAIN}`;

export async function sendEmail(params: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  tracking?: boolean;
}): Promise<{ id: string; message: string } | null> {
  if (!API_KEY || !DOMAIN) {
    logger.warn('Mailgun no configurado, email simulado');
    logger.info(`[SIMULADO] Email a ${params.to}: ${params.subject}`);
    return null;
  }

  const formData = new URLSearchParams({
    from: FROM,
    to: params.to,
    subject: params.subject,
    text: params.text,
    ...(params.html ? { html: params.html } : {}),
    'o:tracking': params.tracking !== false ? 'yes' : 'no',
    'o:tracking-clicks': 'yes',
    'o:tracking-opens': 'yes',
  });

  const response = await axios.post(`${BASE_URL}/messages`, formData, {
    auth: { username: 'api', password: API_KEY },
  });

  logger.info(`Email enviado a ${params.to}: ${response.data.id}`);
  return response.data;
}

export async function trackOpen(messageId: string, prospectId: string): Promise<void> {
  logger.info(`Email abierto: ${messageId} / prospect: ${prospectId}`);
}
