import React, { useEffect, useState } from 'react';

import {
  Button,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Theme
} from '@carbon/react';
import {
  Search,
  Notification,
  Switcher
} from '@carbon/icons-react';
import KeycloakService from '../../service/KeycloakService';

const BCHeader = () => {
  const [keycloakReady, setKeycloakReady] = useState<boolean>(false);

  const getIndexAddress = (): string => {
    if (KeycloakService.isLoggedIn()) {
      return '/home';
    }
    return '/';
  };

  useEffect(() => {
    getIndexAddress();

    KeycloakService.initKeycloak()
      .then(() => {
        setKeycloakReady(true);
      });
  }, [keycloakReady]);

  return (
    <Theme theme="g100">
      <Header aria-label="BC Gov's NR Sample App" data-testid="header">
        <HeaderName href={getIndexAddress()} prefix="BC Gov's" data-testid="header-name">
          NR Sample App
        </HeaderName>
        <HeaderGlobalBar>
          {!!KeycloakService.isLoggedIn() && (
            <Button
              onClick={() => KeycloakService.doLogout()}
              size="sm"
            >
              Logout
            </Button>
          )}
          <HeaderGlobalAction aria-label="Search" data-testid="header-button__search">
            <Search size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Notifications" data-testid="header-button__notifications">
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end" data-testid="header-button__switcher">
            <Switcher size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    </Theme>
  );
};

export default BCHeader;
