import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeycloakService from '../../service/KeycloakService';

const Table = () => {
  const navigate = useNavigate();
  const [keycloakReady, setKeycloakReady] = useState<boolean>(false);

  useEffect(() => {
    KeycloakService.initKeycloak()
      .then(() => {
        setKeycloakReady(true);
        if (!KeycloakService.isLoggedIn()) {
          navigate('/');
        }
      });
  }, [keycloakReady]);

  return (
    <>
      <h2>Search</h2>
      <h2>Results</h2>
    </>
  );
};

export default Table;
