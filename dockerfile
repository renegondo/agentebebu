# ---- Etapa de construcción (Build) ----
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . .
RUN npm run build  # Genera los archivos estáticos en /app/build

# ---- Etapa de producción (Caddy) ----
FROM caddy:alpine

# Copiar los archivos estáticos de React
COPY --from=builder /app/build /usr/share/caddy

# Copiar configuración personalizada de Caddy
COPY Caddyfile /etc/caddy/Caddyfile

# Puerto expuesto (Caddy usa 80/443 por defecto)
EXPOSE 80
EXPOSE 443

# Comando de inicio (Caddy inicia automáticamente)
