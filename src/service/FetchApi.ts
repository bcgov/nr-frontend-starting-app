import UserService from './UserService';

/**
 * Create a request Init
 *
 * @param {string} method a string method to be used on the request.
 * @param {BodyInit} postBody optional body to be sent. When present the request
 *                 is going to use POST method. Otherwise GET will be used.
 * @returns {RequestInit} a RequestInit object
 */
function createRequestInit(method: string, postBody?: BodyInit): RequestInit {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (method === 'POST' && postBody) {
    headers.append('Content-Length', String(postBody.toString().length));
  }

  if (UserService.isLoggedIn()) {
    headers.append('Authorization', `Bearer ${UserService.getToken()}`);
  }

  if (method === 'GET') {
    return {
      method,
      mode: 'cors',
      cache: 'default',
      headers
    };
  }

  return {
    method,
    mode: 'cors',
    cache: 'default',
    headers,
    body: postBody
  };
}

/**
 * Trigger a fetch request using browser fetch API.
 *
 * @param {string} url API or server address
 * @param {RequestInit} config A RequestInit to be used as configuration, containing
 *               headers, method type, mode and more.
 * @returns {Promise} a promise.
 */
function fetchApiRequest<T>(url: string, config = {}): Promise<T> {
  return fetch(url, config)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .then((data) => {
          throw new Error(JSON.stringify(data));
        });
    })
    .then((data) => data as T);
}

export { fetchApiRequest, createRequestInit };
