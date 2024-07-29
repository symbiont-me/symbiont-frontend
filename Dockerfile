##############
# Base Image #
##############
FROM node:20.12.1-alpine3.19 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

#####################
# Development Image #
#####################
FROM builder AS development

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]


#####################
# Production Image  #
#####################
# There is a bug when building the nextjs app as it fails to authenticate
#   with firebase as it probably can't access the env file
FROM builder AS production

WORKDIR /app

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
