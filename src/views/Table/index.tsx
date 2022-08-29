import React from 'react';

import { Grid } from '@mui/material';

const Table = () => (
  <Grid container spacing={4}>
    <Grid item xs={6} sm={3}>
      <h2>Search</h2>
    </Grid>
    <Grid item xs={6} sm={9}>
      <h2>Results</h2>
    </Grid>
  </Grid>
);

export default Table;
