/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import App from './App';
import reportWebVitals from './reportWebVitals';
import keycloak from './keycloak';

const initOptions = {
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
  pkceMethod: 'S256'
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 * If you need to debug:
 * - add onEvent={eventLogger} and onTokens={tokenLogger} to the ReactKeycloakProvider
 *
 * const eventLogger = (event: unknown, error: unknown) => {
 *   console.log('onKeycloakEvent', event, error);
 * };
 * const tokenLogger = (tokens: unknown) => {
 *   console.log('onKeycloakTokens', tokens);
 * };
 */

root.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={initOptions}
    >
      <App />
    </ReactKeycloakProvider>
  </React.StrictMode>
);

/*
UserService.initKeycloak()
  .then((authenticated: boolean) => {
    console.log(`KeyCloak started! User is autenticated: ${authenticated}! ${new Date()}`);
  }).catch((err) => {
    console.log('Some error ocurred:', err);
  }).finally(() => {});
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
