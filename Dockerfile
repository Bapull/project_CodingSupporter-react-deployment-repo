# 빌드 스테이지
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

COPY . .

RUN npm run build

# 실행 스테이지
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]
