import React, { useEffect, useState } from 'react';

import {
  Button,
  FlexGrid,
  Column,
  Row,
  Stack
} from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import LoginProviders from '../../types/LoginProviders';
import KeycloakService from '../../service/KeycloakService';

const Landing = () => {
  const navigate = useNavigate();
  const [keycloakReady, setKeycloakReady] = useState<boolean>(false);
  const [sendToHome, setSendToHome] = useState<boolean>(false);

  const checkLogin = (popup: Window | null) => {
    const interval = setInterval(() => {
      if (popup!.closed) {
        clearInterval(interval);
      }

      const loginResult = localStorage.getItem('spar-login-success');
      if (loginResult === 'true') {
        localStorage.removeItem('spar-login-success');
        setSendToHome(true);
      }
    }, 500);
  };

  const handleLogin = (provider: LoginProviders) => {
    const url = `/start-login?provider=${provider}`;
    const popup = window.open(url, 'loginWindow', 'width=480,height=600');
    checkLogin(popup);
  };

  useEffect(() => {
    KeycloakService.initKeycloak()
      .then(() => {
        setKeycloakReady(true);
        if (KeycloakService.isLoggedIn()) {
          navigate('/home');
        }
      });

    if (sendToHome) {
      navigate('/home');
    }
  }, [keycloakReady, sendToHome]);

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
                onClick={() => { handleLogin(LoginProviders.IDIR); }}
                size="lg"
                data-testid="card-table__button"
              >
                Login with IDIR
              </Button>
              &nbsp;
              <Button
                onClick={() => { handleLogin(LoginProviders.BCEID_BUSINESS); }}
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
