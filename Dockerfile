FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . /app

EXPOSE 5000

CMD ["yarn", "start:prod"]