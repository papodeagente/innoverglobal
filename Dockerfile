# ===== Builder =====
FROM node:20-alpine AS builder
WORKDIR /app

# Cache deps
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# Build app (SPA + prerender estático)
COPY . .
# VITE_SYSTEM_URL é injetado no build (definir via Coolify build args se necessário)
ARG VITE_SYSTEM_URL
ENV VITE_SYSTEM_URL=${VITE_SYSTEM_URL}
RUN npm run build

# Renomeia _shell.html → index.html (TanStack Start gera o shell SPA com esse nome)
RUN if [ -f /app/dist/client/_shell.html ]; then \
      cp /app/dist/client/_shell.html /app/dist/client/index.html; \
    fi

# ===== Runtime (nginx serving static files) =====
FROM nginx:alpine AS runner

# Config: SPA fallback (rotas client-side caem no index.html)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=builder /app/dist/client /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
