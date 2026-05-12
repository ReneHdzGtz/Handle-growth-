import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { router } from './api/routes';
import { startScheduler } from './scheduler/cron';
import { logger } from './utils/logger';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// Seguridad
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: 'Too many requests' }));
app.use(express.json({ limit: '10mb' }));

// Auth middleware simple (API key)
app.use((req, res, next) => {
  if (req.path === '/api/health') return next();
  const key = req.headers['x-api-key'];
  if (process.env.API_SECRET_KEY && key !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Rutas
app.use('/api', router);

// 404
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// Error global
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  logger.info(`Handle Growth Agent V2 corriendo en puerto ${PORT}`);
  logger.info(`Entorno: ${process.env.NODE_ENV || 'development'}`);

  // Iniciar scheduler solo en producción o con flag explícito
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_SCHEDULER === 'true') {
    startScheduler();
  } else {
    logger.info('Scheduler pausado (dev mode). Usa ENABLE_SCHEDULER=true para activar.');
  }
});

export default app;
