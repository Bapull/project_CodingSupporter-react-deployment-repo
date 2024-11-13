# 빌드 스테이지
FROM node:18-alpine AS build

WORKDIR /app

# 1. 필요한 파일들만 복사하여 캐시를 최대한 활용
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

# 2. 전체 소스 파일 복사
COPY . .

# 3. 빌드 수행: TypeScript와 Vite 빌드 프로세스를 한 번에 실행
RUN npm run build

# 실행 스테이지
FROM node:18-alpine

WORKDIR /app


# 4. 빌드 결과물 및 종속성 복사
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./

# 5. 포트 설정
EXPOSE 4173

# 6. 애플리케이션 시작 명령어
CMD ["npm", "run", "preview", "--", "--host"]
