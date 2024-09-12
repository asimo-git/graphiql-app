export type RestFormData = {
  method: string;
  endpoint: string;
  headers: KeyValueArray;
  jsonBody?: Record<string, string>;
  textBody?: string;
  variables?: KeyValueArray;
};

export type RestRequestData = {
  method: string;
  endpoint: string;
  headers?: KeyValueArray;
  jsonBody?: string;
  textBody?: string;
};

export type ResponseData = {
  status: number;
  statusText: string;
  body: unknown;
};

export type KeyValueArray = {
  key: string;
  value: string;
}[];

export type GraphQLFormData = {
  endpoint: string;
  sdlEndpoint?: string;
  query: string;
  variables: string;
  headers: KeyValueArray;
};
