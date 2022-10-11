FROM node:18-alpine

WORKDIR /src
COPY package*.json /
ENV NODE_ENV=development
RUN npm ci
RUN npm install\
        && npm install typescript -g
COPY . .

ENV NODE_ENV=development
RUN tsc
COPY . .

CMD ["node", "./dist/server.js"]
EXPOSE $api_port
