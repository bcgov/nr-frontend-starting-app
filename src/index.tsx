/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserService from './service/UserService';

UserService.initKeycloak()
  .then((authenticated: boolean) => {
    console.log(`KeyCloak started! User is autenticated: ${authenticated}! ${new Date()}`);
  }).catch((err) => {
    console.log('Some error ocurred:', err);
  }).finally(() => {
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
