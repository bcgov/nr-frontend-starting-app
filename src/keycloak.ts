import Keycloak from 'keycloak-js';

const url = process.env.REACT_APP_KC_URL || '';
const realm = process.env.REACT_APP_KC_REALM || '';
const clientId = process.env.REACT_APP_KC_CLIENT_ID || '';

const keycloak = new Keycloak({
  url,
  realm,
  clientId
});

export default keycloak;
