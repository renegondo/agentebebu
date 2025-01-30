FROM node:18 AS builder  # <-- Cambia de Alpine a una imagen completa

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps --force
COPY . .
RUN npm run build
