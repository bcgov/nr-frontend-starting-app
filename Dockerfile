FROM node:16-bullseye
LABEL maintainer="Paulo Gomes da Cruz Junior <paulo.cruz@encora.com>"

RUN yarn global add serve

WORKDIR /app
COPY build/ .

EXPOSE 3000

CMD serve -s build
