import Keycloak from 'keycloak-js';

const kc = new Keycloak({
  url: 'https://dev.loginproxy.gov.bc.ca/auth',
  realm: 'standard',
  clientId: 'nr-fsa-web-app-4266'
});

const initKeycloak = (successCallback: Function) => {
  kc.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
    pkceMethod: 'S256'
  }).then(() => {
    successCallback();
  // eslint-disable-next-line no-console
  }).catch(console.error);
};

const doLogin = kc.login;

const doLogout = kc.logout;

const isLoggedIn = () => !!kc.token;

const getToken = () => {
  if (isLoggedIn()) {
    return kc.token;
  }
  return '';
};

const updateToken = (successCallback: any) => {
  kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);
};

const getUsername = () => {
  const displayName = kc.tokenParsed?.display_name;
  /*
  const email = _kc.tokenParsed?.email;
  */
  return displayName;
};

const hasRole = (roles: string[]) => roles.some((role) => kc.hasRealmRole(role));

const authMethod = (): string => {
  let method = '';
  if (isLoggedIn()) {
    method = kc.tokenParsed?.identity_provider;
  }
  return method;
};

const getRoles = (): string => {
  let roleString = '';
  if (isLoggedIn() && Array.isArray(kc.tokenParsed?.client_roles)) {
    kc.tokenParsed?.client_roles.forEach((role: string) => {
      if (roleString !== '') {
        roleString += ', ';
      }
      roleString += role;
    });
  }
  return roleString;
};

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  getRoles,
  authMethod
};

export default UserService;
