import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCancel, MdCheckBox } from 'react-icons/md';

import { Grid } from '@mui/material';
import { Alert, Button } from 'shared-components';

import TextInput from '../../components/TextInput';
import Label from '../../components/Label';
import UserTable from '../../components/UserTable';

import SampleUser from '../../types/SampleUser';

import './styles.css';
import { fetchApiRequest, getRequestInit } from '../../service/FetchApi';

const Form = () => {
  const BASE_URL = 'https://nrbestapi-test-service-api.apps.silver.devops.gov.bc.ca';

  const [firstName, setFirstName] = React.useState('');
  const [firstFeed, setFirstFeed] = React.useState('');
  const [firstIsValid, setFirstIsValid] = React.useState<boolean | undefined>(undefined);

  const [lastName, setLastName] = React.useState('');
  const [lastFeed, setLastFeed] = React.useState('');
  const [lastIsValid, setLastIsValid] = React.useState<boolean | undefined>(undefined);

  const [submitted, setSubmitted] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  const [users, setUsers] = React.useState<SampleUser[]>([]);

  const fetchData = async () => {
    const result: SampleUser[] = await fetchApiRequest<SampleUser[]>(`${BASE_URL}/users/find-all`, getRequestInit());
    setUsers(result);
  };

  const saveData = async (firstName: string, lastName: string):void => {
    const body = {
      firstName,
      lastName
    };

    const result = await fetchApiRequest(`${BASE_URL}/users`, getRequestInit(body));
    console.log('POST result:', result);
    if (result.errorMessage) {
      console.log('result error:', error);
      window.alert('ooops!');
    } else {
      setFinished(true);
      fetchData();
    }
  }

  const handleFirstName = (event: React.FocusEvent<HTMLElement>): void => {
    const target = event.target as HTMLInputElement;

    if (target.value !== '') {
      setFirstName(target.value.trim());
      setFirstIsValid(true);
      setFirstFeed('OK!');
    } else {
      setFirstIsValid(false);
      setFirstFeed('Please enter a valid value');
    }
  };

  const handleLastName = (event: React.FocusEvent<HTMLElement>): void => {
    const target = event.target as HTMLInputElement;

    if (target.value !== '') {
      setLastName(target.value.trim());
      setLastIsValid(true);
      setLastFeed('OK!');
    } else {
      setLastIsValid(false);
      setLastFeed('Please enter a valid value');
    }
  };

  const handleSubmit = (): void => {
    setSubmitted(true);

    if (firstIsValid && lastIsValid) {
      console.log(`Trigger a POST! with ${firstName} and ${lastName}`);
      saveData(firstName, lastName);
      //setFinished(true);
    }
  };

  const resetForm = (): void => {
    setFirstName('');
    setFirstIsValid(undefined);
    setFirstFeed('');

    setLastName('');
    setLastIsValid(undefined);
    setLastFeed('');

    setSubmitted(false);
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate('/');
  };

  React.useEffect(() => {
    fetchData();
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
        finished && firstIsValid && lastIsValid
          ? <Grid item xs={12}><Alert icon={<MdCheckBox size={32} />} type="success" styling="bcgov-success-background" element="Your name was submitted to nowhere!" /></Grid> : ''
      }
      {
        submitted && (!firstIsValid || !lastIsValid)
          ? <Grid item xs={12}><Alert icon={<MdCancel size={32} />} type="error" styling="bcgov-error-background" element="Please, enter your name correctly!" /></Grid> : ''
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
        <Button onClick={resetForm} label="Cancel" styling="bcgov-normal-white btn buttonMargin" />
        <Button onClick={goBack} label="Back to home" styling="bcgov-normal-white btn buttonMargin" />
      </Grid>
      <Grid item xs={12}>
        <UserTable elements={users} />
      </Grid>
    </Grid>
  );
};

export default Form;
