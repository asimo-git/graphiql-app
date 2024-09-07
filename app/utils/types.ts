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
