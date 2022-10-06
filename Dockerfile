FROM node:16-bullseye

ARG REACT_APP_NRFESAMPLEAPP_VERSION
ARG REACT_APP_SERVER_URL

WORKDIR /app
COPY . .

ENV DISABLE_ESLINT_PLUGIN=true
ENV REACT_APP_NRFESAMPLEAPP_VERSION=$REACT_APP_NRFESAMPLEAPP_VERSION
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL

RUN yarn global add serve

# Install dependencies
RUN yarn install --frozen-lockfile

# Build to production
RUN yarn build:production

EXPOSE 3000

CMD serve -s build
