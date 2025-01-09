#!/bin/bash

# Script de despliegue para Ubuntu

# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependencias
sudo apt install -y nodejs npm nginx

# Instalar NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc

# Instalar la versión LTS de Node.js
nvm install --lts
nvm use --lts

# Clonar el repositorio (reemplazar con tu repositorio)
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio

# Instalar dependencias del proyecto
npm install

# Construir la aplicación
npm run build

# Configurar Nginx
sudo tee /etc/nginx/sites-available/tu_aplicacion <<EOF
server {
    listen 80;
    server_name tu_dominio.com;

    root /ruta/a/tu_repositorio/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# Habilitar sitio en Nginx
sudo ln -s /etc/nginx/sites-available/tu_aplicacion /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Instalar PM2 para gestión de procesos
sudo npm install -g pm2

# Iniciar la aplicación con PM2
pm2 start npm --name "tu_aplicacion" -- start
pm2 startup
pm2 save

echo "Despliegue completado exitosamente!"
