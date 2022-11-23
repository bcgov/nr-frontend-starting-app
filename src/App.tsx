/* eslint-disable no-console */
import React from 'react';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';

import './custom.scss';

import Landing from './views/Landing';
import Form from './views/Form';
import Table from './views/Table';
import Home from './views/Home';
import Layout from './layout/PublicLayout';
import StartLogin from './views/StartLogin';
import LoginSuccess from './views/LoginSuccess';

/**
 * Create an app structure conaining all the routes.
 *
 * @returns {JSX.Element} instance of the app ready to use.
 */
const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/table" element={<Table />} />

        <Route path="/start-login" element={<StartLogin />} />
        <Route path="/login-success" element={<LoginSuccess />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
