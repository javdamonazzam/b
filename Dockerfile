FROM node:alpine3.18

RUN npm i -g @nestjs/cli

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

CMD ["yarn", "start:dev"]

EXPOSE 8000