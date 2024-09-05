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
      return {
        status: response.status,
        statusText: response.statusText,
        body: {
          error:
            'The resource cannot give a correct response to your request. Please check the entered data, the selected method and try to repeat the request.',
        },
      };
    }
    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      body: data,
    };
  } catch (error) {
    const errorMessage = (error as Error)?.message ?? 'Unknown error';
    return {
      status: 0,
      statusText: 'Unknown error',
      body: {
        error: 'Error making fetch request, try again later',
        message: errorMessage,
      },
    };
  }
}
