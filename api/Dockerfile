# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
EXPOSE 4000
CMD ["node" , "express-app.js"]