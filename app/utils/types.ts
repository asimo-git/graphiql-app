export type RestFormData = {
  method: string;
  endpoint: string;
  headers?: {
    key: string;
    value: string;
  }[];
  jsonBody?: Record<string, string> | undefined;
  textBody?: string;
  variables?: {
    key: string;
    value: string;
  }[];
};

export type ResponseRestData = {
  status: number;
  statusText: string;
  body: Record<string, string>;
};
