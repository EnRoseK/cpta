import { GET_OFFICE_PAGE } from '@/api/endpoints';
import { IOfficePage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getOfficePage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: IOfficePage }>(convertApiUrl(GET_OFFICE_PAGE, paramaters))
    .then((res) => res.data);
};
