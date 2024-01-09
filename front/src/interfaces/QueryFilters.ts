export interface QueryFilters {
  locale: string;
  page?: number;
  pageSize?: number;
  limit?: number;
  filters?: {
    [key: string]: {
      [key: string]: string | boolean | { [key: string]: string | boolean };
    };
  };
  fields?: string[] | string;
}
