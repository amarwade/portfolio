# =========================================
# Stage 1: build React static assets
# =========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests first to leverage Docker cache.
COPY package*.json ./
RUN npm ci

# Copy the rest of the frontend source.
COPY . .

# API URL injected at build time for production frontend bundle.
ARG REACT_APP_API_BASE_URL=http://localhost:8081/api
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Build static files.
RUN npm run build

# =========================================
# Stage 2: serve with Nginx
# =========================================
FROM nginx:1.27-alpine

# Replace default nginx site config with SPA-friendly config.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend files.
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx HTTP port.
EXPOSE 80

# Keep nginx in foreground.
CMD ["nginx", "-g", "daemon off;"]
