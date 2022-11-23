import React, { useEffect } from 'react';

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
import { useKeycloak } from '@react-keycloak/web';

const BCHeader = () => {
  const { keycloak, initialized } = useKeycloak();

  const getIndexAddress = (): string => {
    const loggedIn = !!keycloak.authenticated;
    if (loggedIn) {
      return '/home';
    }
    return '/';
  };

  useEffect(() => {
    getIndexAddress();
  }, [initialized, keycloak.authenticated]);

  return (
    <Theme theme="g100">
      <Header aria-label="BC Gov's NR Sample App" data-testid="header">
        <HeaderName href={getIndexAddress()} prefix="BC Gov's" data-testid="header-name">
          NR Sample App
        </HeaderName>
        <HeaderGlobalBar>
          {!!keycloak?.authenticated && (
            <Button
              onClick={() => keycloak.logout()}
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
