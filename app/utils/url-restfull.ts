import { stringToBase64 } from './helpers';

export function urlRESTfull(
  method: string,
  url: string,
  body: object | null = null,
  headers: Record<string, string> = {}
): string {
  const mainUrl = 'http://localhost:3000';

  let needUrl = `${mainUrl}/${method}/${stringToBase64(url)}`;

  if (body) {
    needUrl += `/${stringToBase64(JSON.stringify(body))}`;
  }

  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(headers)) {
    queryParams.append(key, stringToBase64(value));
  }

  if (queryParams.toString()) {
    needUrl += `?${queryParams.toString()}`;
  }

  return needUrl;
}
