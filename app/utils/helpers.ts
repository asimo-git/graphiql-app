import { KeyValueArray, RestRequestData } from './types';

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
    value?: string | KeyValueArray
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
