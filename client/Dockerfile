# syntax=docker/dockerfile:1
# FROM node:18-alpine

# build changes
FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
# EXPOSE 3000
# CMD ["npm", "start"]
# build the app for production
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
