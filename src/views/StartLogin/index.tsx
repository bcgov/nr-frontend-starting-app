import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { KeycloakLoginOptions } from 'keycloak-js';

const StartLogin = () => {
  const { keycloak, initialized } = useKeycloak();

  const createLoginUrl = (provider: string): string => {
    const idpHint = provider === 'idir' ? 'idir' : 'bceid-business';

    const loginOptions: KeycloakLoginOptions = {
      redirectUri: `${window.location.origin}/login-success`,
      idpHint
    };

    return keycloak.createLoginUrl(loginOptions);
  };

  const handleLoginPopUp = () => {
    const paramString = window.location.search.split('?')[1];
    const queryString = new URLSearchParams(paramString);
    let provider: string | null = 'idir';
    if (queryString.has('provider')) {
      provider = queryString.get('provider');
      if (!provider) {
        provider = 'idir';
      }
    }

    const loginUrl = createLoginUrl(provider);
    window.location.href = loginUrl;
  };

  useEffect(() => {
    if (initialized) {
      handleLoginPopUp();
    }
  }, [initialized]);

  return (
    <>
    </>
  );
};

export default StartLogin;
