# Base stage: Install dependencies
FROM node:16-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app/frontend
COPY ./frontend/package*.json ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

# Build stage: Build the app
FROM base AS build
COPY ./frontend /app/frontend/
RUN yarn build

# Production stage: Run the app
FROM node:16-alpine AS production
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --chown=nextjs:nodejs --from=build /app/frontend/.next ./.next
COPY --chown=nextjs:nodejs --from=build /app/frontend/next.config.js \
  /app/frontend/package.json \
  /app/frontend/yarn.lock \
  ./
COPY --from=base /app/frontend/node_modules ./node_modules
USER nextjs
EXPOSE 3000
CMD ["yarn", "start"]
