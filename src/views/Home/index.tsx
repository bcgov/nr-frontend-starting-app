import React from 'react';

import {
  Button,
  FlexGrid,
  Column,
  Row,
  Stack
} from '@carbon/react';
import { useKeycloak } from '@react-keycloak/web';
import { KeycloakLoginOptions } from 'keycloak-js';

const Home = () => {
  const { keycloak } = useKeycloak();

  const createLoginUrl = (provider: 'idir' | 'bceid'): string => {
    const idpHint = provider === 'idir' ? 'idir' : 'bceid-business';

    const loginOptions: KeycloakLoginOptions = {
      redirectUri: `${window.location.origin}/*`,
      idpHint
    };

    return keycloak.createLoginUrl(loginOptions);
  };

  const loginWithIdir = () => {
    if (keycloak.authenticated) {
      console.log('your authenticated 1!');
      return;
    }

    const idirUrl = createLoginUrl('idir');
    console.log('IDIR! ', idirUrl);
    const windowFeatures = 'width=450,height=600,popup=true';
    const handle = window.open(idirUrl, 'loginWindow', windowFeatures);

    if (handle) {
      console.log('success');
    }
  };

  const loginWithBCeID = () => {
    if (keycloak.authenticated) {
      console.log('your authenticated 2!');
      return;
    }

    const bceidUrl = createLoginUrl('bceid');
    console.log('BCeID! ', bceidUrl);
  };

  return (
    <FlexGrid container="true" spacing={4}>
      <Stack gap={6}>
        <Row>
          <Column sm={4}>
            <Stack gap={3}>
              <h1 data-testid="home-title">NR Sample App</h1>
              <p data-testid="home-desc">
                This is a sample application with the purpose of checking BC Gov&apos;s design
                system, themes and react components. The app will also be used to validate
                code style, infrastructe, tech stack, tests, deployment and others.
              </p>
            </Stack>
          </Column>
        </Row>
        <Row>
          <Column sm={4} md={4}>
            <Button
              onClick={loginWithIdir}
              size="lg"
              data-testid="card-table__button"
            >
              Login with IDIR
            </Button>
            &nbsp;
            <Button
              onClick={loginWithBCeID}
              size="lg"
              data-testid="card-table__button"
            >
              Login with Business BCeID
            </Button>
          </Column>
        </Row>
      </Stack>
    </FlexGrid>
  );
};

export default Home;
