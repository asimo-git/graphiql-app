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

export type ResponseRestData = {
  status: number;
  statusText: string;
  body: Record<string, string>;
};

export type KeyValueArray = {
  key: string;
  value: string;
}[];
