# Handle Growth Agent V2

**Sistema autónomo de sales intelligence para brokers de seguros.**

> V2 es la implementación real del sistema. V1 era la presentación/propuesta. Este repo es el código que corre en producción.

---

## Qué cambió de V1 a V2

| V1 (branch `main`) | V2 (branch `v2`) |
|--------------------|------------------|
| Website Next.js / presentación interactiva | API backend Node.js + TypeScript en producción |
| Prototipo que simulaba outputs | 5 agentes reales conectados a Claude API |
| Sin base de datos | PostgreSQL con schema completo e historial |
| Sin automatización | Scheduler con cron jobs (daily, weekly, biweekly) |
| Desplegado en Vercel (frontend) | Docker Compose + Nginx + SSL para VPS propio |
| Demo para pitch a Poncho | Sistema que corre para los 30 brokers reales |

---

## Los 5 Agentes

### 1. Lead Generation Agent
Toma datos crudos de prospectos y devuelve un score de receptividad (0–1) con razonamiento explícito.

```json
{
  "name": "Carlos Mendoza",
  "receptiveness_score": 0.95,
  "why_qualified": "Usa Excel para 200 emails/día, creció 40% YoY, sin solución competidora activa",
  "next_action": "Outreach inmediato. Ángulo: crecimiento + volumen de emails"
}
```

### 2. Outreach Personalization Agent
Genera mensajes A/B para LinkedIn o email. No templates — cada mensaje es específico al broker.

### 3. Conversation Intelligence Agent
Parsea emails, call transcripts o mensajes y extrae pain points, objeciones, señales de budget y próximo paso recomendado.

### 4. Playbook Learning Agent
Agrega insights de múltiples conversaciones y genera versiones del playbook con confidence scores. Requiere mínimo 3 conversaciones; patrones sólidos emergen a las 20+.

### 5. Prediction & Alerts Agent
Predice probabilidad de cierre de cada deal, detecta deals que se están enfriando y recomienda intervenciones específicas.

---

## Stack técnico

```
Runtime:        Node.js 20 + TypeScript
AI:             Claude claude-sonnet-4-6 (Anthropic API)
API:            Express.js
Base de datos:  PostgreSQL 16 (via Supabase o self-hosted)
Scheduler:      node-cron (daily digest, weekly playbook, biweekly outreach)
Integrations:   Apollo.io · Mailgun · Slack
Infraestructura: Docker Compose · Nginx · Let's Encrypt
```

**Costo mensual estimado:** ~$85–105/mes (VPS $6 + Claude API $20–50 + Mailgun $9 + Apollo $49)

---

## Estructura del proyecto

```
src/
├── agents/
│   ├── base.ts                  # Cliente Anthropic compartido
│   ├── leadGenAgent.ts          # Scoring de prospectos
│   ├── outreachAgent.ts         # Generación de mensajes A/B
│   ├── conversationAgent.ts     # Extracción de insights
│   ├── playbookAgent.ts         # Generación de playbook
│   └── predictionAgent.ts      # Predicción de deals
├── api/
│   └── routes.ts               # REST API (Express)
├── db/
│   ├── client.ts               # Pool de conexiones PostgreSQL
│   └── schema.sql              # Schema completo de la DB
├── integrations/
│   ├── apollo.ts               # Lead sourcing
│   ├── mailgun.ts              # Email tracking
│   └── slack.ts                # Alertas al equipo
├── scheduler/
│   └── cron.ts                 # Jobs automáticos
├── types/
│   └── index.ts                # Tipos TypeScript compartidos
└── index.ts                    # Entry point
```

---

## API Endpoints

| Método | Endpoint | Qué hace |
|--------|----------|----------|
| GET | `/api/health` | Status del sistema |
| GET | `/api/stats` | Métricas del pipeline |
| POST | `/api/prospects/score` | Scorear lista de brokers |
| POST | `/api/prospects/search` | Buscar en Apollo.io + scorear |
| POST | `/api/outreach/generate` | Generar mensajes A/B |
| POST | `/api/conversations/analyze` | Analizar conversación |
| GET | `/api/conversations` | Últimas 30 interacciones |
| POST | `/api/playbook/generate` | Generar nueva versión del playbook |
| GET | `/api/playbook/latest` | Ver playbook actual |
| GET | `/api/deals` | Pipeline activo |
| POST | `/api/deals/predict` | Predicción de cierre |

Todas las rutas (excepto `/health`) requieren el header `x-api-key`.

---

## Cómo correr localmente

```bash
git clone https://github.com/ReneHdzGtz/Handle-growth-
git checkout v2
cd Handle-growth-
npm install
cp .env.example .env
# Edita .env con tu ANTHROPIC_API_KEY mínimo
npx tsx test-agent.ts   # Prueba el Lead Gen Agent
```

---

## Despliegue en VPS

Ver [DEPLOY.md](DEPLOY.md) para la guía completa paso a paso:
- Setup de Ubuntu 22.04
- Docker Compose + Nginx + SSL automático con Let's Encrypt
- Comandos del día a día (backup DB, ver logs, actualizar código)

---

## Automatización incluida

| Job | Frecuencia | Qué hace |
|-----|-----------|----------|
| Daily Digest | 6 AM diario | Resumen de interacciones + deals en riesgo → Slack |
| Playbook Update | Lunes 8 AM | Genera nueva versión del playbook si hay 3+ conversaciones nuevas |
| Deal Prediction | 1 y 15 de cada mes | Análisis bi-semanal de pipeline + alerta de deals fríos |

---

## Resultado del primer test (en vivo)

```
Lead: Carlos Mendoza / Seguros Nacional MX
Score: 0.95/1.0
Reasoning: "No tiene solución competidora activa. 200 emails/día + Excel
           = candidato perfecto. Crecimiento 40% YoY indica stack manual
           al límite."
```

---

## Links V1

- Presentación interactiva: https://handle-growth.vercel.app/slides
- Website original: https://handle-growth.vercel.app
