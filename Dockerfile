FROM node:18.17.1 as build

WORKDIR /app
RUN npm install -g pnpm@8.7.6

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm build

########################################

FROM node:18.17.1 as deps

WORKDIR /app
RUN npm install -g pnpm@8.7.6

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

########################################

FROM node:18.17.1 as prod

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY templates/ ./templates

CMD ["node", "dist/index.js"]
