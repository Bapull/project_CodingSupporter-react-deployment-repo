FROM node:18-alpine

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./
RUN npm install

COPY . .

# TypeScript 에러를 무시하고 빌드
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]