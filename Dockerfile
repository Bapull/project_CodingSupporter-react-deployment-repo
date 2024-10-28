FROM node:18-alpine AS builder

WORKDIR /app

COPY tsconfig*.json ./

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN yarn build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

ENV VITE_API_URL=${VITE_API_URL}

EXPOSE 5173

CMD ["yarn", "preview", "--host"]