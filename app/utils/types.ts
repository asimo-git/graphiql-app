export type RestFormData = {
  method: string;
  endpoint: string;
  headers?: {
    key: string;
    value: string;
  }[];
  jsonBody?: string;
  textBody?: string;
};

export type ResponseRestData = {
  status: number;
  body: Record<string, string>;
};
