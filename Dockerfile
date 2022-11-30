FROM node:16-bullseye

ARG REACT_APP_NRFESAMPLEAPP_VERSION
ARG REACT_APP_SERVER_URL
ARG REACT_APP_KC_URL
ARG REACT_APP_KC_REALM
ARG REACT_APP_KC_CLIENT_ID

WORKDIR /app
COPY . .

ENV DISABLE_ESLINT_PLUGIN=true
ENV REACT_APP_NRFESAMPLEAPP_VERSION=$REACT_APP_NRFESAMPLEAPP_VERSION
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
ENV REACT_APP_KC_URL=$REACT_APP_KC_URL
ENV REACT_APP_KC_REALM=$REACT_APP_KC_REALM
ENV REACT_APP_KC_CLIENT_ID=$REACT_APP_KC_CLIENT_ID

# Temporary solution to lots of warnings of keycloak sourcemaps new version
# See https://github.com/react-keycloak/react-keycloak/issues/176
ENV GENERATE_SOURCEMAP=false

RUN yarn global add serve

# Install dependencies
RUN yarn install --frozen-lockfile

# Build to production
RUN yarn build:production

EXPOSE 3000

CMD serve -s build
