import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';
import { Alert, Button } from 'shared-components';

import TextInput from '../../components/TextInput';
import Label from '../../components/Label';

import './styles.css';

const Form = () => {
  const [firstFeed, setFirstFeed] = React.useState('');
  const [lastFeed, setLastFeed] = React.useState('');
  const [firstIsValid, setFirstIsValid] = React.useState<boolean | undefined>(undefined);
  const [lastIsValid, setLastIsValid] = React.useState<boolean | undefined>(undefined);
  const [submitted, setSubmitted] = React.useState(false);

  const handleFirstName = (event: React.FocusEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.value !== '') {
      setFirstIsValid(true);
      setFirstFeed('OK!');
    } else {
      setFirstIsValid(false);
      setFirstFeed('Please enter a valid value');
    }
  };

  const handleLastName = (event: React.FocusEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.value !== '') {
      setLastIsValid(true);
      setLastFeed('OK!');
    } else {
      setLastIsValid(false);
      setLastFeed('Please enter a valid value');
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate('/');
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <h1>NR Front End Form</h1>
        <p>
          This is a simple test form, please write your information correctly.
        </p>
      </Grid>
      {
        submitted && firstIsValid && lastIsValid ? <Grid item xs={12}><Alert type="success" styling="bcgov-success-background" element="Your name was submitted to nowhere!" /></Grid> : ''
      }
      {
        submitted && !(firstIsValid && lastIsValid) ? <Grid item xs={12}><Alert type="error" styling="bcgov-error-background" element="Please, enter your name correctly!" /></Grid> : ''
      }
      <Grid item xs={12} sm={6}>
        <Label labelStr="First Name" forStr="fnInput" />
        <TextInput id="fnInput" isValid={firstIsValid} feedback={firstFeed} blur={handleFirstName} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Label labelStr="Last Name" forStr="lnInput" />
        <TextInput id="lnInput" isValid={lastIsValid} feedback={lastFeed} blur={handleLastName} />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleSubmit} label="Submit" styling="bcgov-normal-blue btn buttonMargin" />
        <Button onClick={goBack} label="Cancel" styling="bcgov-normal-white btn buttonMargin" />
      </Grid>
    </Grid>
  );
};

export default Form;
