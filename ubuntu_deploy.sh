#!/bin/bash

# Script de Despliegue Completo para Ubuntu - Aplicación React SPF
#chmod +x ubuntu_deploy.sh
#sudo ./ubuntu_deploy.sh

# Colores para los mensajes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # Sin color

# Función de manejo de errores
handle_error() {
    echo -e "${RED}Error: $1${NC}"
    exit 1
}

# Verificar que se está ejecutando con sudo
if [ "$EUID" -ne 0 ]; then
    handle_error "Por favor, ejecuta el script con sudo"
fi

# Actualizar sistema
echo -e "${YELLOW}Actualizando sistema...${NC}"
apt update && apt upgrade -y || handle_error "Fallo en actualización del sistema"

# Instalar dependencias
echo -e "${YELLOW}Instalando dependencias...${NC}"
apt install -y curl git nginx nodejs npm build-essential

# Instalar NVM (Node Version Manager)
echo -e "${YELLOW}Instalando NVM...${NC}"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Instalar Node.js LTS
nvm install --lts
nvm use --lts

# Configurar directorio de la aplicación
APP_DIR="/var/www/spf-app"
mkdir -p $APP_DIR

# Clonar repositorio de rama específica
echo -e "${YELLOW}Clonando repositorio...${NC}"
git clone -b desarrollo https://github.com/nicolas-netizen/SPF.git $APP_DIR || handle_error "Fallo al clonar repositorio"
cd $APP_DIR

# Instalar dependencias del proyecto
npm install || handle_error "Fallo en instalación de dependencias"

# Construir la aplicación
npm run build || handle_error "Fallo en construcción de la aplicación"

# Configurar Nginx
echo -e "${YELLOW}Configurando Nginx...${NC}"
tee /etc/nginx/sites-available/spf-app <<EOF
server {
    listen 80;
    server_name test.com www.test.com;

    root $APP_DIR/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Configuraciones de seguridad
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    # Compresión gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;
}
EOF

# Habilitar sitio
ln -s /etc/nginx/sites-available/spf-app /etc/nginx/sites-enabled/
nginx -t || handle_error "Configuración de Nginx inválida"

# Instalar PM2 para gestión de procesos
npm install -g pm2 || handle_error "Fallo en instalación de PM2"

# Iniciar aplicación en modo desarrollo con PM2
pm2 start npm --name "spf-dev" -- run dev
# O en modo producción
# pm2 start npm --name "spf-prod" -- run preview
pm2 startup systemd
pm2 save

# Reiniciar Nginx
systemctl restart nginx || handle_error "Fallo al reiniciar Nginx"

# Configurar firewall (si está instalado ufw)
ufw allow 'Nginx Full'

echo -e "${GREEN}✅ Despliegue completado exitosamente!${NC}"
echo -e "${YELLOW}Accede a tu aplicación en: http://test.com${NC}"

# Mostrar estado de la aplicación
pm2 status
nginx -t
