import React from 'react';
import { Container, Grid } from '@mui/material';

import HeaderBanner from '../HeaderBanner';
import HeaderBox from '../HeaderBox';
import HeaderImage from '../HeaderImage';
import HeaderTitle from '../HeaderTitle';

const Header = () => (
  <HeaderBox>
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <HeaderBanner>
          <a href="/" title="Go to home page">
            <HeaderImage src="https://developer.gov.bc.ca/static/BCID_H_rgb_rev-20eebe74aef7d92e02732a18b6aa6bbb.svg" alt="Government of British Columbia logo" height="45px" />
          </a>
          <HeaderTitle data-testid="header-title">
            NR Sample App
          </HeaderTitle>
        </HeaderBanner>
      </Grid>
    </Container>
  </HeaderBox>
);

export default Header;
