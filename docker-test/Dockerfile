FROM node:lts-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

ENTRYPOINT [ "pnpm", "run", "dev" ]
