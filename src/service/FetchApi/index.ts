/**
 * Create a request Init
 *
 * @param postBody optional body to be sent. When present the request
 * is going to use POST method. Otherwise GET will be used.
 * @returns a RequestInit object
 */
function getRequestInit(postBody?: BodyInit): RequestInit {
  if (!postBody) {
    return {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: { 'Content-Type': 'application/json' }
    };
  }

  return {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postBody)
  };
}

function fetchApiRequest<T>(url: string, config: RequestInit = {}): Promise<T> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as T);
}

export { fetchApiRequest, getRequestInit };
