import { GET_DIRECTORS_PAGE } from '@/api/endpoints';
import { QueryFilters, QueryParamaters, IDirectorsPage } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getDirectorsPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: IDirectorsPage }>(convertApiUrl(GET_DIRECTORS_PAGE, paramaters))
    .then((res) => res.data);
};
