FROM node:16-bullseye

WORKDIR /app
COPY . .

ENV DISABLE_ESLINT_PLUGIN=true

RUN yarn global add serve

# Install dependencies
RUN yarn install --frozen-lockfile

# Build to production
RUN yarn build:production

EXPOSE 3000

CMD serve -s build
