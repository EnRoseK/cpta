export interface QueryFilters {
  locale: string;
  page?: number;
  pageSize?: number;
  limit?: number;
  filters?: {
    [key: string]: {
      [key: string]: string | boolean | string[] | { [key: string]: string | boolean | string[] };
    };
  };
  fields?: string[] | string;
}
