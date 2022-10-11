FROM node:18-alpine

WORKDIR /src
COPY package*.json /
ENV NODE_ENV=development
RUN npm ci
COPY . .

ENV NODE_ENV=production
RUN npm run build
COPY . .

CMD ["npm", "run", "debug"]
EXPOSE $api_port
