# Fase 1: Construcción
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el resto de los archivos del proyecto
COPY gestion-usuarios-web/package*.json ./

# Instalar dependencias
RUN npm install
RUN npm prune --omit=dev

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación Nuxt
RUN npm run build

# Fase 2: Ejecución
FROM node:20-alpine AS runner

# Crear el directorio de configuración
RUN mkdir -p /app/config && chmod 777 /app/config

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios desde la fase de construcción
COPY --from=builder /app/.output/ ./.output/

# Establecer las variables de entorno
ENV NODE_ENV=production
ENV PORT=3001

# Comando por defecto para ejecutar la aplicación
CMD ["node", ".output/server/index.mjs"]
