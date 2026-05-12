# Guía de Despliegue en VPS — Handle Growth Agent V2

## 1. Elige tu VPS

Recomendaciones (precio/performance):

| Proveedor | Plan | Specs | Precio |
|-----------|------|-------|--------|
| **Hetzner** (recomendado) | CX21 | 2 vCPU / 4 GB RAM | ~$6/mes |
| DigitalOcean | Basic | 2 vCPU / 2 GB RAM | $12/mes |
| Linode | Nanode 2GB | 1 vCPU / 2 GB RAM | $12/mes |

**Sistema operativo:** Ubuntu 22.04 LTS

---

## 2. Setup inicial del servidor

```bash
# Conéctate como root
ssh root@TU_IP_VPS

# Ejecuta el script de setup
curl -fsSL https://raw.githubusercontent.com/TU_REPO/main/scripts/setup-vps.sh | bash

# Crea un usuario no-root para el día a día
adduser deploy
usermod -aG sudo deploy
usermod -aG docker deploy
```

---

## 3. Configura tu dominio

En tu proveedor de DNS (Namecheap, Cloudflare, etc.):

```
A record:   tudominio.com  →  TU_IP_VPS
A record:   api.tudominio.com  →  TU_IP_VPS
```

Espera 5-10 minutos a que propague.

---

## 4. Sube el código al servidor

```bash
# En tu máquina local — sube los archivos
scp -r handle-growth-v2/ deploy@TU_IP_VPS:/home/deploy/

# O clona desde GitHub (recomendado para updates)
ssh deploy@TU_IP_VPS
git clone https://github.com/TU_USUARIO/handle-growth-v2.git
cd handle-growth-v2
```

---

## 5. Configura las variables de entorno

```bash
# En el servidor
cd handle-growth-v2
cp .env.example .env
nano .env   # O usa vim si prefieres
```

Rellena todos los valores:

```env
NODE_ENV=production
PORT=3001
ANTHROPIC_API_KEY=sk-ant-TUKEY
DATABASE_URL=postgresql://handle:TUPASSWORD@postgres:5432/handle_growth
POSTGRES_USER=handle
POSTGRES_PASSWORD=GENERA_PASSWORD_SEGURO
POSTGRES_DB=handle_growth
MAILGUN_API_KEY=...
MAILGUN_DOMAIN=mg.tudominio.com
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
API_SECRET_KEY=GENERA_KEY_SEGURA_AQUI
```

Genera passwords seguros así:
```bash
openssl rand -base64 32   # Para POSTGRES_PASSWORD y API_SECRET_KEY
```

---

## 6. Configura nginx con tu dominio

```bash
# Edita nginx.conf y reemplaza tudominio.com con tu dominio real
nano nginx/nginx.conf

# Busca la línea:  server_name tudominio.com;
# Cámbiala a:     server_name api.tudominio.com;  (o tu dominio)
```

---

## 7. Obtén SSL con Let's Encrypt (primera vez)

```bash
# Primero levanta nginx en modo HTTP solamente para que certbot funcione
# Comenta temporalmente el bloque de HTTPS en nginx.conf,
# luego levanta solo nginx:
docker compose up -d nginx

# Obtén el certificado
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email tu@email.com \
  --agree-tos \
  --no-eff-email \
  -d tudominio.com

# Descomenta el bloque HTTPS en nginx.conf
# Ahora levanta todo:
docker compose down
```

---

## 8. Despliega con Docker Compose

```bash
# Build y levanta todo
docker compose up -d --build

# Verifica que todo esté corriendo
docker compose ps

# Deberías ver:
# handle-growth-api    Up   healthy
# handle-postgres      Up   healthy
# handle-nginx         Up
# handle-certbot       Up
```

---

## 9. Verifica que funcione

```bash
# Health check
curl https://tudominio.com/api/health

# Respuesta esperada:
# {"status":"ok","version":"2.0.0","timestamp":"..."}

# Prueba con tu API key
curl -H "x-api-key: TU_API_SECRET_KEY" \
     https://tudominio.com/api/stats
```

---

## 10. Primeros pasos con el agente

### A. Buscar y scorear brokers
```bash
curl -X POST https://tudominio.com/api/prospects/score \
  -H "Content-Type: application/json" \
  -H "x-api-key: TU_KEY" \
  -d '{
    "prospects": [
      {
        "name": "Carlos Mendoza",
        "company": "Seguros Nacional",
        "title": "Operations Manager",
        "location": "CDMX",
        "company_size": "45"
      }
    ]
  }'
```

### B. Generar outreach para un broker
```bash
# Usa el ID del prospect que te devolvió el paso anterior
curl -X POST https://tudominio.com/api/outreach/generate \
  -H "Content-Type: application/json" \
  -H "x-api-key: TU_KEY" \
  -d '{"prospect_id": "UUID_DEL_PROSPECT", "platform": "linkedin"}'
```

### C. Analizar una conversación
```bash
curl -X POST https://tudominio.com/api/conversations/analyze \
  -H "Content-Type: application/json" \
  -H "x-api-key: TU_KEY" \
  -d '{
    "prospect_id": "UUID_DEL_PROSPECT",
    "content": "Hola, gracias por conectar. Vi tu mensaje sobre Handle. Actualmente estamos usando Excel para todo y honestamente es un desastre. Tenemos 200 emails al día y mi equipo dedica 4 horas solo a cotizaciones manuales.",
    "type": "linkedin_msg",
    "direction": "inbound"
  }'
```

### D. Generar playbook (después de 3+ conversaciones)
```bash
curl -X POST https://tudominio.com/api/playbook/generate \
  -H "x-api-key: TU_KEY"
```

---

## Comandos útiles del día a día

```bash
# Ver logs en tiempo real
docker compose logs -f api

# Reiniciar solo el API
docker compose restart api

# Actualizar el código (desde GitHub)
git pull origin main
docker compose up -d --build api

# Ver estado de todos los servicios
docker compose ps

# Backup de la base de datos
docker compose exec postgres pg_dump -U handle handle_growth > backup_$(date +%Y%m%d).sql

# Conectarse a la DB directamente
docker compose exec postgres psql -U handle handle_growth

# Ver cuántos prospectos hay
docker compose exec postgres psql -U handle handle_growth \
  -c "SELECT COUNT(*), AVG(receptiveness_score) FROM prospects;"
```

---

## Renovación automática del SSL

El contenedor `certbot` ya hace esto automáticamente cada 12 horas.
Para renovar manualmente:

```bash
docker compose run --rm certbot renew
docker compose restart nginx
```

---

## Costo total mensual estimado

| Componente | Costo |
|------------|-------|
| VPS (Hetzner CX21) | ~$6 |
| Anthropic API (Claude) | ~$20-50 |
| Mailgun (Flex) | $9 |
| Apollo.io (basic) | $49 |
| Dominio | ~$1 |
| **Total** | **~$85-105/mes** |

---

## Troubleshooting común

**El API no responde:**
```bash
docker compose logs api --tail=50
```

**Error de base de datos:**
```bash
docker compose logs postgres --tail=20
# Verifica que DATABASE_URL en .env apunta a 'postgres' (nombre del servicio)
```

**Nginx 502 Bad Gateway:**
```bash
# El API tardó en arrancar, espera 30 seg y reintenta
docker compose ps api   # Debe decir "healthy"
```

**SSL no funciona:**
```bash
docker compose logs certbot
# Verifica que el DNS apunta a tu IP correctamente
```
