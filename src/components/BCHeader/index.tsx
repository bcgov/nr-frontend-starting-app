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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const BCHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const goOut = () => {
    logout();
    navigate('/');
  };

  return (
    <Theme theme="g100">
      <Header aria-label="BC Gov's NR Sample App" data-testid="header">
        <HeaderName href="/home" prefix="BC Gov's" data-testid="header-name">
          NR Sample App
        </HeaderName>
        <HeaderGlobalBar>
          <Button
            onClick={() => goOut()}
            size="sm"
          >
            Logout
          </Button>
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
