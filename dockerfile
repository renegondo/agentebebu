FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./

# Instala dependencias con force (si hay conflictos)
RUN npm config set legacy-peer-deps true
RUN npm install

COPY . .
RUN npm run build  # Asegúrate de que este comando genera /app/build

# ---- Etapa de producción ----
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
