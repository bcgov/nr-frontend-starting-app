import React from 'react';

import { Grid } from '@mui/material';

import Card from '../../components/Card';

const Home = () => {
  const formLink = <a href="/form" className="btn btn-primary">Go!</a>;
  const tableLink = <a href="/table" className="btn btn-primary">Go!</a>;

  return (
    <Grid container spacing={4}>
      <Grid item lg={12}>
        <h1>NR Front End Testing App</h1>
        <p>
          This is a sample application with the purpose of checking BC Gov&apos;s design system,
          themes and react components. The app will also be used to validate code style,
          infrastructe, tech stack, tests, deployment and others.
        </p>
      </Grid>
      <Grid item sm={12} md={6}>
        <Card title="Sample User Form" text="This is a simple form to validate the user's inputs.">
          {formLink}
        </Card>
      </Grid>
      <Grid item sm={12} md={6}>
        <Card title="Sample Search" text="This is a simple table showing results of a simulated search.">
          {tableLink}
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
