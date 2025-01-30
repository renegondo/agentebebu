# ---- Etapa de construcción ----
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build  # Asegúrate de que este comando genera /app/build

# ---- Etapa de producción ----
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
