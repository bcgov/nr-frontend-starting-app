import { KeycloakLoginOptions } from 'keycloak-js';
import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';
import KeycloakService from '../service/KeycloakService';
import KeycloakUser from '../types/KeycloakUser';

export type AuthContextData = {
  signed: boolean;
  user: KeycloakUser | {};
  initKeycloak(): Promise<boolean>;
  login(options?: KeycloakLoginOptions): Promise<void>;
  logout(): Promise<void>;
  createLoginUrl(options?: KeycloakLoginOptions): string;
  provider: string;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }: Props) => {
  const [signed, setSigned] = useState<boolean>(false);
  const [user, setUser] = useState<KeycloakUser | {}>({});

  /**
   * Starts Keycloak instance.
   */
  async function initKeycloak() {
    try {
      const userIsLoggedIn = await KeycloakService.initKeycloak();
      setSigned(userIsLoggedIn);
      const kcUser = KeycloakService.getUser();
      setUser(kcUser);
      return userIsLoggedIn;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Keycloak init error:', e);
    }
    return false;
  }

  /**
   * Logout the user
   */
  async function logout() {
    try {
      await KeycloakService.logout();
      setUser({});
      setSigned(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Keycloak logout error:', e);
    }
  }

  const { createLoginUrl, login } = KeycloakService;
  const provider = KeycloakService.authMethod();

  // memoize
  const contextValue = useMemo(() => ({
    signed,
    user,
    initKeycloak,
    login,
    logout,
    createLoginUrl,
    provider
  }), [signed, user, initKeycloak, login, logout, createLoginUrl, provider]);

  return (
    <AuthContext.Provider value={contextValue}>
      { children }
    </AuthContext.Provider>
  );
};

/**
 * Create useAuth hook.
 *
 * @returns {AuthContext} context.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
