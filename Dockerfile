# Stage 1: Build Stage
FROM node:22-bookworm-slim AS builder

# Install OpenSSL required by Prisma
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package manifests & Prisma schema first for layer caching
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (triggers postinstall -> prisma generate)
RUN npm ci

# Copy application source
COPY tsconfig*.json nest-cli.json ./
COPY src ./src/

# Build NestJS application to ./dist
RUN npm run build

# Prune devDependencies to keep production image small
RUN npm prune --omit=dev

# Stage 2: Production Runner Stage
FROM node:22-bookworm-slim AS runner

RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000

CMD ["node", "dist/main.js"]
