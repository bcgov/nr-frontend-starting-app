import React from 'react';

import {
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

const BCHeader = () => (
  <Theme theme="g100">
    <Header aria-label="BC Gov's NR Sample App">
      <HeaderName href="/" prefix="BC Gov's">
        NR Sample App
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Search">
          <Search size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Notifications">
          <Notification size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
          <Switcher size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  </Theme>
);

export default BCHeader;
