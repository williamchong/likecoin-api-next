FROM node:10-alpine AS base
WORKDIR /app
COPY package.json yarn.lock /app/

FROM base AS builder
RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*
RUN yarn --production --frozen-lockfile
RUN cp -R node_modules prod_node_modules
RUN yarn --frozen-lockfile
ADD . /app
RUN NODE_ENV=production yarn build

FROM base AS release
ENV NODE_ENV production
COPY --from=builder /app/prod_node_modules ./node_modules
COPY --from=builder /app/build ./build
ADD config /app/config
EXPOSE 3000
CMD node build/main.js
