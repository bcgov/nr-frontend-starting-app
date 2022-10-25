/* eslint-disable no-console */
import Keycloak from 'keycloak-js';

const url = process.env.REACT_APP_KC_URL || '';
const realm = process.env.REACT_APP_KC_REALM || '';
const clientId = process.env.REACT_APP_KC_CLIENT_ID || '';

const kc = new Keycloak({ url, realm, clientId });

const initKeycloak = (successCallback: Function) => {
  console.log('Starting KeyCloak instance...');
  kc.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
    pkceMethod: 'S256'
  }).then((authenticated: boolean) => {
    console.log(`KeyCloak started! User is autenticated: ${authenticated}`);
    successCallback();
  }).catch((e) => {
    console.log('Some error ocurred:', e);
  });
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
  return displayName;
};

const hasRole = (role: string): boolean => {
  let permission = false;
  if (isLoggedIn() && Array.isArray(kc.tokenParsed?.client_roles)) {
    permission = kc.tokenParsed?.client_roles.filter((r) => r === role).length === 1;
  }
  return permission;
};

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
