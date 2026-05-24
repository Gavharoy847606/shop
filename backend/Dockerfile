# 1. Base image sifatida Node.js ning rasmiy barqaror versiyasini olamiz
FROM node:20-alpine

# 2. Konteyner ichida loyiha ishlaydigan papkani belgilaymiz
WORKDIR /usr/src/app

# 3. Paketlar ro'yxatini konteynerga nusxalaymiz
COPY package*.json ./

# 4. Konteyner ichida kerakli kutubxonalarni o'rnatamiz
RUN npm install

# 5. Qolgan barcha backend kodlarimizni konteyner ichiga ko'chiramiz
COPY . .

# 6. TypeScript kodimizni JavaScript-ga build (kompilyatsiya) qilamiz
RUN npm run build

# 7. Serverimiz ishlaydigan portni ochib qo'yamiz
EXPOSE 5000

# 8. Konteyner ishga tushganda bajariladigan yakuniy buyruq
CMD ["npm", "start"]