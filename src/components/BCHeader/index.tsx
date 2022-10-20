import React from 'react';

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
import UserService from '../../service/UserService';

const BCHeader = () => (
  <Theme theme="g100">
    <Header aria-label="BC Gov's NR Sample App" data-testid="header">
      <HeaderName href="/" prefix="BC Gov's" data-testid="header-name">
        NR Sample App
      </HeaderName>
      <HeaderGlobalBar>
        {UserService.isLoggedIn() && (
          <Button
            onClick={() => { UserService.doLogout(); }}
            size="sm"
          >
            Logout
          </Button>
        )}
        {!UserService.isLoggedIn() && (
          <Button
            onClick={() => { UserService.doLogin(); }}
            size="sm"
          >
            Login
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

export default BCHeader;
