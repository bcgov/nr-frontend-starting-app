import SampleUser from '../../types/SampleUser';

function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}

function getUsers() {
  const BASE_URL = 'https://nrbestapi-test-service-api.apps.silver.devops.gov.bc.ca';

  return request<SampleUser>(`${BASE_URL}/users/find-all`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((data) => {
    console.log('data', data);
    return data;
  });
}

export default getUsers;
