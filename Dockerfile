FROM node:16.15-alpine3.14

WORKDIR /app
COPY . .

RUN yarn global add serve
RUN yarn install --frozen-lockfile && yarn build

EXPOSE 3000

CMD serve -s build