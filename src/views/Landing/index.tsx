import React, { useEffect } from 'react';

import {
  Button,
  FlexGrid,
  Column,
  Row,
  Stack
} from '@carbon/react';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';

type Provider = 'idir' | 'bceid-business';

const Landing = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const checkLogin = () => {
    const interval = setInterval(() => {
      const loginResult = localStorage.getItem('spar-login-success');
      console.log('spar-login-success:', loginResult);
      if (loginResult === 'true') {
        clearInterval(interval);
        localStorage.removeItem('spar-login-success');
        window.location.href = '/home';
      }
    }, 1000);

    console.log('interval:', interval);
  };

  const handleLogin = (provider: Provider) => {
    const url = `/start-login?provider=${provider}`;
    window.open(url, 'loginWindow', 'width=480,height=600');
    checkLogin();
  };

  useEffect(() => {
    if (keycloak.authenticated) {
      console.log('yeaaaasss!');
      navigate('/home');
    }
  }, [keycloak.authenticated]);

  return (
    <FlexGrid className="mainContainer">
      <FlexGrid container="true" spacing={4}>
        <Stack gap={6}>
          <Row>
            <Column sm={4}>
              <Stack gap={3}>
                <h1 data-testid="home-title">NR Sample App</h1>
                <p data-testid="home-desc">
                  Landing page
                </p>
              </Stack>
            </Column>
          </Row>
          <Row>
            <Column sm={4} md={4}>
              <Button
                onClick={() => { handleLogin('idir'); }}
                size="lg"
                data-testid="card-table__button"
              >
                Login with IDIR
              </Button>
              &nbsp;
              <Button
                onClick={() => { handleLogin('bceid-business'); }}
                size="lg"
                data-testid="card-table__button"
              >
                Login with Business BCeID
              </Button>
            </Column>
          </Row>
        </Stack>
      </FlexGrid>
    </FlexGrid>
  );
};

export default Landing;
