import React, { useEffect, useState } from 'react';
import KeycloakService from '../../service/KeycloakService';

const LoginSuccess = () => {
  const [keycloakReady, setKeycloakReady] = useState<boolean>(false);

  const handlePopup = () => {
    localStorage.setItem('spar-login-success', 'true');
    window.close();
  };

  useEffect(() => {
    KeycloakService.initKeycloak()
      .then(() => {
        setKeycloakReady(true);
        handlePopup();
      });
  }, [keycloakReady]);

  return (
    <>
    </>
  );
};

export default LoginSuccess;
