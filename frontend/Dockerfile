# 1. Build bosqichi
FROM node:20-alpine AS builder
WORKDIR /app

# Biz Docker'ga aytyapmizki, package.json shu yerning o'zida turibdi
COPY package*.json ./
RUN npm install

# Hamma kodlarni ko'chiramiz
COPY . .

# Bulutli backend manzilini build paytida ham o'qiy olishi uchun argument
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Next.js loyihani build qilamiz
RUN npm run build

# 2. Ishga tushirish (Production) bosqichi
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Fayllarni to'g'ri nusxalash
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]