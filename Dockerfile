FROM node:18-alpine AS builder

WORKDIR /app

COPY tsconfig*.json ./

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build || (echo "Build failed" && exit 1)

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./


EXPOSE 5173/tcp

CMD ["npm", "run", "preview", "--", "--host"]