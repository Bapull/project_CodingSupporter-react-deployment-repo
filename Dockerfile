# 빌드 스테이지
FROM node:18-alpine AS build

WORKDIR /app

# 1. 필요한 파일들만 복사하여 캐시를 최대한 활용
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

# 2. 전체 소스 파일 복사
COPY . .

# 3. TypeScript 빌드: 사용되지 않는 import 및 변수 포함하여 빌드가 완료되도록 설정
RUN npx tsc --noEmit false && npm run build

# 실행 스테이지
FROM node:18-alpine

WORKDIR /app

# 4. 빌드 결과물 및 종속성 복사
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./

# 6. 포트 설정
EXPOSE 4173

# 7. 애플리케이션 시작 명령어
CMD ["npm", "run", "preview", "--", "--host"]
