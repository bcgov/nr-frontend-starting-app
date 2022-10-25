import React from 'react';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';

import './custom.scss';

import Layout from './layout/PublicLayout';
import Home from './views/Home';
import Form from './views/Form';
import Table from './views/Table';

/**
 * Create an app structure conaining all the routes.
 *
 * @returns {JSX.Element} instance of the app ready to use.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/table" element={<Table />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
