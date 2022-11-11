/* eslint-disable no-console */
import React from 'react';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';

import './custom.scss';

import Layout from './layout/PublicLayout';
import Home from './views/Home';
import Form from './views/Form';
import Table from './views/Table';
import keycloak from './keycloak';

const initOptions = {
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
  pkceMethod: 'S256'
};

const eventLogger = (event: unknown, error: unknown) => {
  console.log('onKeycloakEvent', event, error);
};
const tokenLogger = (tokens: unknown) => {
  console.log('onKeycloakTokens', tokens);
};

/**
 * Create an app structure conaining all the routes.
 *
 * @returns {JSX.Element} instance of the app ready to use.
 */
const App: React.FC = () => (
  <ReactKeycloakProvider
    initOptions={initOptions}
    authClient={keycloak}
    onEvent={eventLogger}
    onTokens={tokenLogger}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/table" element={<Table />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ReactKeycloakProvider>
);

export default App;
