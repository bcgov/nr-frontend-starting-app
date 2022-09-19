/**
 * Create a request Init
 *
 * @param postBody optional body to be sent. When present the request
 *                 is going to use POST method. Otherwise GET will be used.
 * @returns a RequestInit object
 */
function createRequestInit(method: string, postBody?: BodyInit): RequestInit {
  if (method === 'GET') {
    return {
      method,
      mode: 'cors',
      cache: 'default',
      headers: { 'Content-Type': 'application/json' }
    };
  }

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (method === 'POST' && postBody) {
    headers.append('Content-Length', String(postBody.toString().length));
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
 * @param url API or server address
 * @param config A RequestInit to be used as configuration, containing
 *               headers, method type, mode and more.
 * @returns a promise.
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
