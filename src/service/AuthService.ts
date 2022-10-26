interface KeyCloakUser {
  clientRoles?: Array<string>,
  displayName?: string,
  email?: string,
  lastName?: string,
  firstName?: string,
  identityProvider?: string,
  idirUsername?: string,
  name?: string,
}

/**
 * Parse a token.
 *
 * @param {any} keycloak keycloak instance
 * @param {boolean} initialized tells if the keycloak instance is initialized.
 * @returns {KeyCloakUser} a keyCloakUser object.
 */
function parseToken(keycloak: any, initialized: boolean): KeyCloakUser {
  if (!initialized || !keycloak || !keycloak.tokenParsed) {
    return {};
  }

  return {
    clientRoles: keycloak.tokenParsed.client_roles || [],
    displayName: keycloak?.tokenParsed!.display_name,
    email: keycloak?.tokenParsed!.email,
    lastName: keycloak?.tokenParsed!.family_name,
    firstName: keycloak?.tokenParsed!.given_name,
    identityProvider: keycloak?.tokenParsed!.identity_provider,
    idirUsername: keycloak?.tokenParsed!.idir_username,
    name: keycloak?.tokenParsed!.name
  };
}

const kcClientRoles = (keycloak: any, initialized: boolean): Array<string> => {
  const parsed = parseToken(keycloak, initialized);
  return parsed.clientRoles || [];
};

const kcIdentityProvider = (keycloak: any, initialized: boolean) => {
  const parsed = parseToken(keycloak, initialized);
  return (parsed === null ? '' : parsed.identityProvider?.toUpperCase());
};

const kcToken = (keycloak: any) => keycloak?.token || '';

const kcUserDisplayName = (keycloak: any, initialized: boolean) => {
  const parsed = parseToken(keycloak, initialized);
  return (parsed === null ? '' : parsed.displayName);
};

const kcUserEmail = (keycloak: any, initialized: boolean) => {
  const parsed = parseToken(keycloak, initialized);
  return (parsed === null ? '' : parsed.email);
};

const kcUserLastName = (keycloak: any, initialized: boolean) => {
  const parsed = parseToken(keycloak, initialized);
  return (parsed === null ? '' : parsed.lastName);
};

const kcUserFirstName = (keycloak: any, initialized: boolean) => {
  const parsed = parseToken(keycloak, initialized);
  return (parsed === null ? '' : parsed.firstName);
};

const kcUserIdir = (keycloak: any, initialized: boolean) => {
  const parsed = parseToken(keycloak, initialized);
  return (parsed === null ? '' : parsed.idirUsername);
};

const kcUserName = (keycloak: any, initialized: boolean) => {
  const parsed = parseToken(keycloak, initialized);
  return (parsed === null ? '' : parsed.name);
};

const kcUserHasRole = (keycloak: any, initialized: boolean, role: string) => {
  const roles = kcClientRoles(keycloak, initialized);
  return roles.includes(role);
};

export {
  kcClientRoles,
  kcIdentityProvider,
  kcToken,
  kcUserDisplayName,
  kcUserEmail,
  kcUserLastName,
  kcUserFirstName,
  kcUserIdir,
  kcUserName,
  kcUserHasRole
};
