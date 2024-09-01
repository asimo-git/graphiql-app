export type RestFormData = {
  method: string;
  endpoint: string;
  headers?: {
    key: string;
    value: string;
  }[];
  jsonBody?: Record<string, string> | undefined;
  textBody?: string;
};

export type ResponseRestData = {
  status: number;
  statusText: string;
  body: Record<string, string>;
};
