import { FIELD_NAMES } from './constants';
import { stringToBase64 } from './helpers';
import Routes from './routes';
import { FieldName, KeyValueObj } from './types';

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
