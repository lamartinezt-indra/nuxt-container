# Fase 1: Construcción
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación Nuxt 3
# RUN npm install -g nuxt
RUN npm run build

# Fase 2: Ejecución
FROM node:20-alpine AS runner

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios desde la fase de construcción
COPY --from=builder /app/.output /app/.output

# Exponer el puerto (por defecto es el 3000)
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["node", ".output/server/index.mjs"]
