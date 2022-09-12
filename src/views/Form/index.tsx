import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';
import { Alert, Button } from 'shared-components';

import TextInput from '../../components/TextInput';
import Label from '../../components/Label';
import UserTable from '../../components/UserTable';

 import SampleUser from '../../types/SampleUser';

import './styles.css';
import getUsers from '../../api/UserSampleApi';

const Form = () => {
  const [firstFeed, setFirstFeed] = React.useState('');
  const [lastFeed, setLastFeed] = React.useState('');
  const [firstIsValid, setFirstIsValid] = React.useState<boolean | undefined>(undefined);
  const [lastIsValid, setLastIsValid] = React.useState<boolean | undefined>(undefined);
  const [submitted, setSubmitted] = React.useState(false);
  const [users, setUsers] = React.useState<any[]>([]);

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

  const getUsers = () => {
    const BASE_URL = 'https://nrbestapi-test-service-api.apps.silver.devops.gov.bc.ca';

    function request<TResponse>(
      url: string,
      config: RequestInit = {}
    ): Promise<TResponse> {
      return fetch(url, config)
        .then((response) => response.json())
        .then((data) => data as TResponse);
    }

    return request<SampleUser>(`${BASE_URL}/users/find-all`, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((dataJson) => {
      console.log('dataJson', dataJson);
      setUsers(dataJson);
    });
  };

  React.useEffect(() => {
    getUsers();
  }, []);

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
      <UserTable elements={users} />
    </Grid>
  );
};

export default Form;
