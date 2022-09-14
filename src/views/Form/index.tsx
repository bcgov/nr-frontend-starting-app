import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';

import { Grid } from '@mui/material';
import { Alert, Button } from 'shared-components';

import TextInput from '../../components/TextInput';
import Label from '../../components/Label';
import UserTable from '../../components/UserTable';

import SampleUser from '../../types/SampleUser';
import toApiException from '../../types/ApiException';

import './styles.css';
import { fetchApiRequest, createRequestInit } from '../../service/FetchApi';

const Form = () => {
  const BASE_URL = 'https://nrbestapi-test-service-api.apps.silver.devops.gov.bc.ca';

  const [firstName, setFirstName] = React.useState('');
  const [firstFeed, setFirstFeed] = React.useState('');
  const [firstIsValid, setFirstIsValid] = React.useState<boolean | undefined>(undefined);

  const [lastName, setLastName] = React.useState('');
  const [lastFeed, setLastFeed] = React.useState('');
  const [lastIsValid, setLastIsValid] = React.useState<boolean | undefined>(undefined);

  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [users, setUsers] = React.useState<SampleUser[]>([]);

  const resetForm = (): void => {
    setFirstName('');
    setFirstIsValid(undefined);
    setFirstFeed('');

    setLastName('');
    setLastIsValid(undefined);
    setLastFeed('');

    setShowError(false);
    setErrorMessage('');
  };

  const handleError = (error: unknown): void => {
    const errorObject = toApiException(error);
    setShowError(true);
    setErrorMessage(errorObject.errorMessage);
  };

  const fetchData = async () => {
    try {
      const result: SampleUser[] = await fetchApiRequest<SampleUser[]>(`${BASE_URL}/users/find-all`, createRequestInit('GET'));
      setUsers(result);
    } catch (error) {
      handleError(error);
    }
  };

  const saveUser = async (first: string, last: string) => {
    const body = JSON.stringify({
      firstName: first,
      lastName: last
    });

    try {
      await fetchApiRequest(`${BASE_URL}/users`, createRequestInit('POST', body));
      resetForm();
      fetchData();
    } catch (error) {
      handleError(error);
    }
  };

  const deleteUser = async (first: string, last: string) => {
    try {
      await fetchApiRequest(`${BASE_URL}/users/${first}/${last}`, createRequestInit('DELETE'));
      fetchData();
    } catch (error) {
      handleError(error);
    }
  };

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFirstName(event.target.value.trim());

    if (event.target.value !== '') {
      setFirstIsValid(true);
      setFirstFeed('OK!');
    } else {
      setFirstIsValid(false);
      setFirstFeed('Please enter a valid value');
    }
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLastName(event.target.value.trim());

    if (event.target.value !== '') {
      setLastIsValid(true);
      setLastFeed('OK!');
    } else {
      setLastIsValid(false);
      setLastFeed('Please enter a valid value');
    }
  };

  const handleSubmit = (): void => {
    let message = '';

    if (!firstIsValid && !lastIsValid) {
      message = 'Please, enter your first and last name!';
    } else if (!firstIsValid) {
      message = 'Please, enter your first name!';
    } else if (!lastIsValid) {
      message = 'Please, enter your last name!';
    }

    setShowError(message !== '');
    setErrorMessage(message);

    if (message === '') {
      saveUser(firstName, lastName);
    }
  };

  const enterKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate('/');
  };

  const deleteByIndex = (idx: number): void => {
    const userToDelete = users[idx];
    deleteUser(userToDelete.firstName, userToDelete.lastName);
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
        showError && (
        <Grid item xs={12}>
          <Alert icon={<MdCancel size={32} />} type="error" styling="bcgov-error-background" element={errorMessage} />
        </Grid>
        )
      }
      <Grid item xs={12} sm={6}>
        <Label labelStr="First Name" forStr="fnInput" />
        <TextInput
          id="fnInput"
          isValid={firstIsValid}
          feedback={firstFeed}
          onChangeHandler={handleFirstName}
          inputValue={firstName}
          onKeyDownHandler={enterKeyHandler}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Label labelStr="Last Name" forStr="lnInput" />
        <TextInput
          id="lnInput"
          isValid={lastIsValid}
          feedback={lastFeed}
          onChangeHandler={handleLastName}
          inputValue={lastName}
          onKeyDownHandler={enterKeyHandler}
        />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleSubmit} label="Submit" styling="bcgov-normal-blue btn buttonMargin" />
        <Button onClick={resetForm} label="Reset" styling="bcgov-normal-white btn buttonMargin" />
        <Button onClick={goBack} label="Back to home" styling="bcgov-normal-white btn buttonMargin" />
      </Grid>
      <Grid item xs={12}>
        <UserTable elements={users} deleteFn={deleteByIndex} />
      </Grid>
    </Grid>
  );
};

export default Form;
