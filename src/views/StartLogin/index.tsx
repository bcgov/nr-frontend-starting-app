import React, { useEffect, useState } from 'react';
import { KeycloakLoginOptions } from 'keycloak-js';
import LoginProviders from '../../types/LoginProviders';
import KeycloakService from '../../service/KeycloakService';

const StartLogin = () => {
  const [keycloakReady, setKeycloakReady] = useState<boolean>(false);

  const createLoginUrl = (provider: LoginProviders): string => {
    const idpHint = provider === 'idir' ? 'idir' : 'bceid-business';

    const loginOptions: KeycloakLoginOptions = {
      redirectUri: `${window.location.origin}/login-success`,
      idpHint
    };

    return KeycloakService.doCreateLoginUrl(loginOptions);
  };

  const createLoginProviders = (): LoginProviders => {
    const paramString = window.location.search.split('?')[1];
    const queryString = new URLSearchParams(paramString);
    let provider: string | null = 'idir';
    if (queryString.has('provider')) {
      provider = queryString.get('provider');
    }

    if (provider === LoginProviders.BCEID_BUSINESS) {
      return LoginProviders.BCEID_BUSINESS;
    }

    return LoginProviders.IDIR;
  };

  const handleLoginPopUp = () => {
    const provider: LoginProviders = createLoginProviders();
    const loginUrl = createLoginUrl(provider);
    window.location.href = loginUrl;
  };

  useEffect(() => {
    KeycloakService.initKeycloak()
      .then(() => {
        setKeycloakReady(true);
        handleLoginPopUp();
      });
  }, [keycloakReady]);

  return (
    <>
    </>
  );
};

export default StartLogin;
