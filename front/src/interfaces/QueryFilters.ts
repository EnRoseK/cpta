export interface QueryFilters {
  locale: string;
  page?: number;
  pageSize?: number;
  filters?: {
    [key: string]: {
      [key: string]: string | boolean;
    };
  };
}
