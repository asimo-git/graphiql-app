import { stringToBase64 } from './helpers';
import { RestFormData } from './types';

export function urlRESTfull(data: RestFormData, mainUrl: string): string {
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

export function parseUrlToFormData(url: string): RestFormData | null {
  try {
    const baseUrl = 'http://localhost';
    const urlObj = new URL(url, baseUrl);
    const pathSegments = urlObj.pathname
      .split('/')
      .filter((segment) => segment);
    if (pathSegments.length < 2) return null;

    const method = pathSegments[1];
    const endpoint = decodeURIComponent(atob(pathSegments[2]));

    const restFormData: RestFormData = {
      method: method,
      endpoint: endpoint,
      headers: [],
    };

    if (pathSegments.length > 3) {
      const bodySegment = decodeURIComponent(atob(pathSegments[3]));
      try {
        restFormData.jsonBody = JSON.parse(bodySegment);
      } catch {
        restFormData.textBody = bodySegment;
      }
    }

    urlObj.searchParams.forEach((value, key) => {
      restFormData.headers.push({
        key: key,
        value: decodeURIComponent(atob(value)),
      });
    });
    return restFormData;
  } catch (error) {
    console.error('Parse URL error:', error);
    return null;
  }
}
