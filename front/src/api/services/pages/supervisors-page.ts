import { GET_SUPERVISORS_PAGE } from '@/api/endpoints';
import { ISupervisorsPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getSupervisorsPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: ISupervisorsPage }>(convertApiUrl(GET_SUPERVISORS_PAGE, paramaters))
    .then((res) => res.data);
};
