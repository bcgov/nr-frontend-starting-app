/* eslint-disable no-unused-vars */

/**
 * Create a KeyCloak mock object.
 *
 * @returns {object} keycloak mocked.
 */
export default function mockUseKeycloak() {
  const token = 'A random string that is non zero length';
  const userProfile = {
    username: 'test',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User'
  };
  const realmAccess = { roles: ['user'] };

  const authClient = {
    authenticated: true,
    hasRealmRole(ignored: string) {
      return true;
    },
    hasResourceRole(ignored: string) {
      return true;
    },
    idToken: token,
    profile: userProfile,
    realm: 'TestRealm',
    realmAccess,
    refreshToken: token,
    token
  };
  return { initialized: true, keycloak: authClient };
}
