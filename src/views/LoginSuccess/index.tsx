import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

const LoginSuccess = () => {
  const { initialized } = useKeycloak();

  const handlePopup = () => {
    localStorage.setItem('spar-login-success', 'true');
    window.close();
  };

  useEffect(() => {
    if (initialized) {
      handlePopup();
    }
  }, [initialized]);

  return (
    <>
    </>
  );
};

export default LoginSuccess;
