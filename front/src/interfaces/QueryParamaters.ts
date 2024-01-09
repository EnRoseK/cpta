export interface QueryParamaters {
  populate?: string[] | string | { [key: string]: string | { [key: string]: string } };
  fields?: string[] | string;
  pagination?: {
    page?: number;
    pageSize?: number;
    limit?: number;
  };
  filters?: {
    [key: string]: {
      [key: string]: string | boolean | { [key: string]: string | boolean };
    };
  };
  sort?: string[] | string;
  locale?: string;
}
