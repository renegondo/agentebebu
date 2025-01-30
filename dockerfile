# ---- Etapa de construcción (React) ----
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Etapa de producción (Solo archivos estáticos) ----
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
