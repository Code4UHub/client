FROM node:18-alpine


RUN apk update && apk add bash

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

ENV NODE_ENV production

RUN cd server && npm ci

CMD ["npm", "run", "start"]