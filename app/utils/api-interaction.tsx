import { ResponseRestData, RestRequestData } from './types';

export async function makeApiRequest(
  requestData: RestRequestData
): Promise<ResponseRestData | undefined> {
  const { method, endpoint, headers, jsonBody, textBody } = requestData;

  const fetchHeaders = new Headers();
  headers?.forEach(({ key, value }) => {
    if (key && value) {
      fetchHeaders.append(key, value);
    }
  });

  let body = undefined;
  if (method !== 'GET' && method !== 'HEAD') {
    body = jsonBody ?? textBody;
  }

  const requestOptions: RequestInit = {
    method,
    headers: fetchHeaders,
    body,
    redirect: 'follow',
  };

  try {
    const response: Response = await fetch(endpoint, requestOptions);
    if (!response.ok) {
      const data = await response.text();
      return {
        status: response.status,
        statusText: response.statusText,
        body: { error: data },
      };
    }
    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      body: data,
    };
  } catch (error) {
    console.error('Error making fetch request:', error);
  }
}
