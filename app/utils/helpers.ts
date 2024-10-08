import { HistoryRequest, KeyValueObj, RestRequestData } from './types';

export const getPasswordStrengthPercentage = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[a-zA-Z]/.test(password)) strength += 25;
  if (/\d/.test(password)) strength += 25;
  if (/[^a-zA-Z0-9\s]/.test(password)) strength += 25;
  return strength;
};

export function parseWithVariables(
  requestData: RestRequestData,
  variables: {
    key: string;
    value: string;
  }[]
): RestRequestData {
  const variablesObj = variables.reduce(
    (acc, { key, value }) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>
  );

  const replaceTemplates = (text: string) =>
    text.replace(/{{(\w+)}}/g, (match, key) => variablesObj[key] || match);

  const processValue = (
    value?: string | KeyValueObj[]
  ): string | { key: string; value: string }[] | undefined => {
    if (typeof value === 'string') {
      return replaceTemplates(value);
    } else if (Array.isArray(value)) {
      return value.map((item) => ({
        key: replaceTemplates(item.key),
        value: replaceTemplates(item.value),
      }));
    } else {
      return value;
    }
  };

  const requestDataWithVariables = Object.fromEntries(
    Object.entries(requestData).map(([key, value]) => [
      key,
      processValue(value),
    ])
  ) as RestRequestData;

  return requestDataWithVariables;
}

export const stringToBase64 = (str: string) => {
  const bytes = new TextEncoder().encode(str);
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64;
};

export const decodeRequest = (obj: HistoryRequest) => {
  let method = '';
  let encodedUrl = '';
  let body = '';
  const parts = obj.url.split('/');
  const restfulIndex = parts.indexOf('RESTfull');
  if (restfulIndex !== -1) {
    method = parts[restfulIndex + 1];
    encodedUrl = atob(parts[restfulIndex + 2]);
    body = parts[restfulIndex + 3];
  }
  return { method, encodedUrl, body };
};

export function initialArray() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('arrayRequests');
    return saved ? JSON.parse(saved) : [];
  }
}

export function getAndRemoveDataFromLS(key: string) {
  if (typeof window !== 'undefined') {
    const stringData = localStorage.getItem(key);
    if (stringData) {
      const data = JSON.parse(stringData);
      localStorage.removeItem(key);
      return data;
    }
  }
  return null;
}
