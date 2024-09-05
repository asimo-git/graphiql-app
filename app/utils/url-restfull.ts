import { stringToBase64 } from './helpers';
import { RestFormData } from './types';

export function urlRESTfull(data: RestFormData, mainUrl: string): string {
  // const mainUrl = window.location.href;

  let needUrl = `${mainUrl}/${data.method}/${stringToBase64(data.endpoint)}`;

  if (data.jsonBody) {
    needUrl += `/${stringToBase64(JSON.stringify(data.jsonBody))}`;
  } else if (data.textBody) {
    needUrl += `/${stringToBase64(data.textBody)}`;
  }

  const queryParams = new URLSearchParams();

  if (data.headers.length > 0) {
    data.headers.forEach((header) => {
      queryParams.append(header.key, stringToBase64(header.value));
    });
  }

  if (queryParams.toString()) {
    needUrl += `?${queryParams.toString()}`;
  }

  return needUrl;
}
