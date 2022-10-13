import React from 'react';

import {
  Button,
  TextInput,
  InlineNotification,
  FlexGrid,
  Column,
  Row,
  Stack
} from '@carbon/react';

import LoadingButton from '../../components/LoadingButton';
import UserTable from '../../components/UserTable';

import SampleUser from '../../types/SampleUser';
import getExceptionResponse from '../../service/GetExceptionResponse';

import { fetchApiRequest, createRequestInit } from '../../service/FetchApi';

import './styles.css';

const Form = () => {
  const BASE_URL = 'https://nrbestapi-test-service-api.apps.silver.devops.gov.bc.ca';

  const [firstName, setFirstName] = React.useState('');
  const [firstFeed, setFirstFeed] = React.useState('');
  const [firstInvalid, setFirstInvalid] = React.useState<boolean | undefined>(undefined);

  const [lastName, setLastName] = React.useState('');
  const [lastFeed, setLastFeed] = React.useState('');
  const [lastInvalid, setLastInvalid] = React.useState<boolean | undefined>(undefined);

  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [users, setUsers] = React.useState<SampleUser[]>([]);

  const [disableElements, setDisableElements] = React.useState(false);

  const tableHeaders: String[] = ['#', 'First name', 'Last name', 'Delete?'];
  const loadingStatus = {
    loading: 'Submitting...',
    success: 'Submitted!',
    error: 'Error'
  };

  const resetForm = (): void => {
    setFirstName('');
    setFirstInvalid(undefined);
    setFirstFeed('');

    setLastName('');
    setLastInvalid(undefined);
    setLastFeed('');

    setDisableElements(false);
    setShowError(false);
    setErrorMessage('');
  };

  const handleError = (error: unknown): void => {
    const errorObject = getExceptionResponse(error);
    setShowError(true);
    setErrorMessage(errorObject.errorMessage);
    setDisableElements(false);

    if ('fields' in errorObject) {
      errorObject.fields.forEach((fieldException) => {
        if (fieldException.fieldName === 'firstName') {
          setFirstFeed(fieldException.fieldMessage);
          setFirstInvalid(false);
        } else if (fieldException.fieldName === 'lastName') {
          setLastFeed(fieldException.fieldMessage);
          setLastInvalid(false);
        }
      });
    }
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
      setDisableElements(true);
      await fetchApiRequest(`${BASE_URL}/users`, createRequestInit('POST', body));
      resetForm();
      fetchData();


      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const deleteUser = async (first: string, last: string) => {
    try {
      await fetchApiRequest(`${BASE_URL}/users/${first}/${last}`, createRequestInit('DELETE'));
      fetchData();
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const setFirst = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFirstName(event.target.value.trim());
  };

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value === '') {
      setFirstInvalid(true);
      setFirstFeed('Please enter a valid value');
    } else {
      setFirstInvalid(false);
      setFirstFeed('');
    }
  };

  const setLast = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLastName(event.target.value.trim());
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value === '') {
      setLastInvalid(true);
      setLastFeed('Please enter a valid value');
    } else {
      setLastInvalid(false);
      setLastFeed('');
    }
  };

  const handleSubmit = async (): Promise<boolean> => {
    let message = '';

    if ((firstInvalid && lastInvalid)
        || (typeof firstInvalid !== 'boolean' && typeof lastInvalid !== 'boolean')) {
      message = 'Please, enter your first and last name!';
    } else if (firstInvalid || typeof firstInvalid !== 'boolean') {
      message = 'Please, enter your first name!';
    } else if (lastInvalid || typeof lastInvalid !== 'boolean') {
      message = 'Please, enter your last name!';
    }

    setShowError(message !== '');
    setErrorMessage(message);

    if (message === '') {
      return saveUser(firstName, lastName);
    }
    return false;
  };

  const deleteByIndex = async (idx: number): Promise<boolean> => {
    const userToDelete = users[idx];
    return deleteUser(userToDelete.firstName, userToDelete.lastName);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <FlexGrid>
      <Stack gap={6}>
        <Row>
          <Column sm={4}>
            <Stack gap={3}>
              <h1>NR Front End Form</h1>
              <p>
                This is a very simple form. Please, fill your first and last name then hit Submit!
              </p>
            </Stack>
          </Column>
        </Row>
        <Row>
          <Column sm={4}>
            {
              showError && (
                <InlineNotification
                  kind="error"
                  title="Error"
                  subtitle={errorMessage}
                  role="alert"
                  lowContrast
                />
              )
            }
          </Column>
        </Row>
        <Row>
          <Column sm={4} md={4}>
            <TextInput
              id="first-name"
              invalidText={firstFeed}
              labelText="First name"
              placeholder="Please put your first name here"
              invalid={firstInvalid}
              value={firstName}
              onBlur={handleFirstName}
              onChange={setFirst}
              disabled={disableElements}
              data-testid="first-name"
            />
          </Column>
          <Column sm={4} md={4}>
            <TextInput
              id="last-name"
              invalidText={lastFeed}
              labelText="Last name"
              placeholder="Please put your last name here"
              invalid={lastInvalid}
              value={lastName}
              onBlur={handleLastName}
              onChange={setLast}
              disabled={disableElements}
            />
          </Column>
        </Row>
        <Row>
          <Column className="buttonsColumn" sm={4}>
            <Button
              onClick={resetForm}
              kind="tertiary"
              size="md"
              disabled={disableElements}
            >
              Reset
            </Button>
            <LoadingButton
              clickFn={handleSubmit}
              label="Submit"
              status={loadingStatus}
            />
          </Column>
        </Row>
        <Row>
          <Column sm={4}>
            <UserTable elements={users} deleteFn={deleteByIndex} headers={tableHeaders} />
          </Column>
        </Row>
      </Stack>
    </FlexGrid>
  );
};

export default Form;
