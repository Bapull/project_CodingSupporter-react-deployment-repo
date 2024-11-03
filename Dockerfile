FROM node:18-alpine AS builder

WORKDIR /app

COPY tsconfig*.json ./

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build || (echo "Build failed" && exit 1)

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

ENV VITE_API_URL=${VITE_API_URL}

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]