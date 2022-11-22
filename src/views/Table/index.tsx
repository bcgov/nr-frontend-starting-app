import { useKeycloak } from '@react-keycloak/web';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized) {
      if (!keycloak.authenticated) {
        navigate('/');
      }
    }
  }, [keycloak.authenticated]);

  return (
    <>
      <h2>Search</h2>
      <h2>Results</h2>
    </>
  );
};

export default Table;
