import { FIELD_NAMES } from './constants';
import { stringToBase64 } from './helpers';
import Routes from './routes';
import { FieldName, KeyValueObj, RestFormData } from './types';

// export function urlRESTfull(data: RestFormData, mainUrl: string): string {
//   let needUrl = `${mainUrl}/${data.method}/${stringToBase64(data.endpoint)}`;

//   if (data.jsonBody) {
//     needUrl += `/${stringToBase64(JSON.stringify(data.jsonBody))}`;
//   } else if (data.textBody) {
//     needUrl += `/${stringToBase64(data.textBody)}`;
//   }

//   const queryParams = new URLSearchParams();

//   if (data.headers.length > 0) {
//     data.headers.forEach((header) => {
//       queryParams.append(header.key, stringToBase64(header.value));
//     });
//   }

//   if (queryParams.toString()) {
//     needUrl += `?${queryParams.toString()}`;
//   }

//   return needUrl;
// }

export function parseUrlToFormData(url: string): RestFormData | null {
  try {
    const baseUrl = 'http://localhost';
    const urlObj = new URL(url, baseUrl);
    const pathSegments = urlObj.pathname
      .split('/')
      .filter((segment) => segment);
    if (pathSegments.length < 2) return null;

    const endpoint = decodeURIComponent(atob(pathSegments[2]));

    const dataFormUrl: RestFormData = {
      method: pathSegments[1],
      endpoint,
      headers: [],
    };

    if (pathSegments.length > 3) {
      const bodySegment = decodeURIComponent(atob(pathSegments[3]));
      try {
        JSON.parse(bodySegment);
        dataFormUrl.jsonBody = bodySegment;
      } catch {
        dataFormUrl.textBody = bodySegment;
      }
    }

    urlObj.searchParams.forEach((value, key) => {
      dataFormUrl.headers.push({
        key: key,
        value: value,
      });
    });
    console.log(dataFormUrl);
    return dataFormUrl;
  } catch (error) {
    console.error('Parse URL error:', error);
    return null;
  }
}

export function updateURL(fieldName: FieldName, value: string | KeyValueObj[]) {
  const baseUrl = window.location.origin;
  const currentUrl = new URL(window.location.href);
  const pathSegments = window.location.pathname
    .split('/')
    .filter((segment) => segment.length > 0);
  console.log(pathSegments[0], Routes.RESTfull);

  if (!pathSegments[1]) {
    const method =
      '/' + pathSegments[0] === Routes.RESTfull ? 'GET' : 'GRAPHQL';
    pathSegments[1] = method;
  }

  switch (fieldName) {
    case FIELD_NAMES.METHOD:
      pathSegments[1] = value as string;
      break;
    case FIELD_NAMES.ENDPOINT:
      pathSegments[2] = stringToBase64(value as string);
      break;
    case FIELD_NAMES.BODY:
      pathSegments[3] = stringToBase64(value as string);
      break;
    case FIELD_NAMES.HEADERS:
      const searchParams = new URLSearchParams();
      if (typeof value !== 'string') {
        value.forEach((field) => {
          if (field.key && field.value) {
            searchParams.set(field.key, field.value);
          }
        });
        window.history.pushState(
          {},
          '',
          `${baseUrl}/${pathSegments.join('/')}?${searchParams.toString()}`
        );
        return;
      }
    default:
      break;
  }

  window.history.pushState(
    {},
    '',
    `${baseUrl}/${pathSegments.join('/')}?${currentUrl.searchParams.toString()}`
  );
  console.log('posle', window.location);
}
