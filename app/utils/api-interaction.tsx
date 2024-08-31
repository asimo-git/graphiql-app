import { ResponseRestData, RestFormData } from './types';

export async function makeApiRequest(
  formData: RestFormData
): Promise<ResponseRestData | undefined> {
  const { method, endpoint, headers, jsonBody, textBody } = formData;

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
    const data = await response.json();
    return { status: response.status, body: data };
  } catch (error) {
    console.error('Error making fetch request:', error);
  }
}
