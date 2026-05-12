#!/bin/bash
# Setup inicial del VPS para Handle Growth Agent V2
# Ejecuta como root en Ubuntu 22.04: bash setup-vps.sh

set -e
echo "=== Handle Growth V2 - Setup VPS ==="

# 1. Actualizar sistema
apt-get update && apt-get upgrade -y

# 2. Instalar dependencias base
apt-get install -y curl git ufw fail2ban nginx-extras

# 3. Instalar Docker + Docker Compose
curl -fsSL https://get.docker.com | sh
apt-get install -y docker-compose-plugin
usermod -aG docker $SUDO_USER || true

# 4. Firewall básico
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw --force enable

# 5. fail2ban (protección brute force)
systemctl enable fail2ban
systemctl start fail2ban

echo ""
echo "=== Setup base completado ==="
echo "Próximo paso: ver DEPLOY.md"
