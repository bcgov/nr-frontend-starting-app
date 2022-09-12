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
          <FooterLink data-testid="footer-home" href="#">
            Home
          </FooterLink>
        </Grid>
        <Grid item xs="auto">
          <FooterLink data-testid="footer-disclaimer" href="#">
            Disclaimer
          </FooterLink>
        </Grid>
        <Grid item xs="auto">
          <FooterLink data-testid="footer-privacy" href="#">
            Privacy
          </FooterLink>
        </Grid>
        <Grid item xs="auto">
          <FooterLink data-testid="footer-acc" href="#">
            Accessibility
          </FooterLink>
        </Grid>
        <Grid item xs="auto">
          <FooterLink data-testid="footer-copyright" href="#">
            Copyright
          </FooterLink>
        </Grid>
        <Grid item xs="auto">
          <FooterLink data-testid="footer-contact" href="#">
            Contact Us
          </FooterLink>
        </Grid>
      </Grid>
    </Container>
  </FooterBox>
);

export default Footer;
