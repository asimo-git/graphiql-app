import { FIELD_NAMES } from './constants';

export type RestFormData = {
  method: string;
  endpoint: string;
  headers: KeyValueObj[];
  jsonBody?: string;
  textBody?: string;
  variables?: KeyValueObj[];
};

export type RestRequestData = {
  method: string;
  endpoint: string;
  headers: KeyValueObj[];
  jsonBody?: string;
  textBody?: string;
};

export type ResponseData = {
  status: number;
  statusText: string;
  body: unknown;
};

export type KeyValueObj = {
  key: string;
  value: string;
};

export type HistoryRequest = {
  url: string;
  date: string;
};

export type HistoryURL = {
  urlTo: string;
  method: string;
  encodedUrl: string;
  body: string;
  date: string;
};

export type GraphQLFormData = {
  endpoint: string;
  sdlEndpoint?: string;
  query: string;
  variables: string;
  headers: KeyValueObj[];
};

export type FieldName = (typeof FIELD_NAMES)[keyof typeof FIELD_NAMES];
