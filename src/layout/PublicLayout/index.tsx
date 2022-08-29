import React from 'react';

import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';

const Layout = () => (
  <>
    <Header />
    <Container component="main" className="mainContainer">
      <Outlet />
    </Container>
    <Footer />
  </>
);

export default Layout;
