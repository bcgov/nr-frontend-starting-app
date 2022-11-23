import keycloak from '../keycloak';

const initKeycloak = () => keycloak.init({
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
  pkceMethod: 'S256'
});

const doLogin = keycloak.login;

const doLogout = keycloak.logout;

const getToken = () => keycloak.token;

const isLoggedIn = () => !!keycloak.token;

const updateToken = (successCallback: any) => {
  keycloak.updateToken(5)
    .then(successCallback)
    .catch(doLogin);
};

const getUsername = () => {
  const displayName = keycloak.tokenParsed?.display_name;
  return displayName;
};

const hasRole = (role: string) => {
  if (isLoggedIn() && Array.isArray(keycloak.tokenParsed?.client_roles)) {
    const found = keycloak.tokenParsed?.client_roles.find((r) => r === role);
    return found === role;
  }
  return false;
};

const authMethod = (): string => {
  let method = '';
  if (isLoggedIn()) {
    method = keycloak.tokenParsed?.identity_provider;
  }
  return method;
};

const getRoles = (): string => {
  let roleString = '';
  if (isLoggedIn() && Array.isArray(keycloak.tokenParsed?.client_roles)) {
    keycloak.tokenParsed?.client_roles.forEach((role: string) => {
      if (roleString !== '') {
        roleString += ', ';
      }
      roleString += role;
    });
  }
  return roleString;
};

const doCreateLoginUrl = keycloak.createLoginUrl;

const KeycloakService = {
  initKeycloak,
  doLogin,
  doLogout,
  doCreateLoginUrl,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  getRoles,
  authMethod
};

export default KeycloakService;
