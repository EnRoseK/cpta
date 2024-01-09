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
      [key: string]: string | boolean | string[] | { [key: string]: string | boolean | string[] };
    };
  };
  sort?: string[] | string;
  locale?: string;
}
