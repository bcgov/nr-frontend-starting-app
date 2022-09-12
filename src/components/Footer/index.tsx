import React from 'react';
import { Container, Grid } from '@mui/material';

import FooterLink from '../FooterLink';
import FooterBox from '../FooterBox';

const Footer = () => (
  <FooterBox>
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs="auto">
          <FooterLink href="#">
            Home
          </FooterLink>
        </Grid>
        <Grid item xs="auto">
          <FooterLink href="#">
            Disclaimer
          </FooterLink>
        </Grid>
        <Grid item xs="auto">
          <FooterLink href="#">
            Privacy
          </FooterLink>
        </Grid>
        <Grid item xs="auto">
          <FooterLink href="#">
            Accessibility
          </FooterLink>
        </Grid>
        <Grid item xs="auto">
          <FooterLink href="#">
            Copyright
          </FooterLink>
        </Grid>
        <Grid item xs="auto">
          <FooterLink href="#">
            Contact Us
          </FooterLink>
        </Grid>
      </Grid>
    </Container>
  </FooterBox>
);

export default Footer;
