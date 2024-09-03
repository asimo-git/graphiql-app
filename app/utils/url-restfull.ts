import { stringToBase64 } from './helpers';
import { RestFormData } from './types';

export function urlRESTfull(data: RestFormData): string {
  const mainUrl = 'http://localhost:3000';

  let needUrl = `${mainUrl}/${data.method}/${stringToBase64(data.endpoint)}`;

  if (data.jsonBody) {
    needUrl += `/${stringToBase64(JSON.stringify(data.jsonBody))}`;
  } else if (data.textBody) {
    needUrl += `/${stringToBase64(data.textBody)}`;
  }

  const queryParams = new URLSearchParams();

  if (data.headers) {
    data.headers.forEach((header) => {
      if (header) {
        queryParams.append(header.key, stringToBase64(header.value));
      }
    });
  }

  if (queryParams.toString()) {
    needUrl += `?${queryParams.toString()}`;
  }

  return needUrl;
}
