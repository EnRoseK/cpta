import { GET_TAX_ANALYSTS_PAGE } from '@/api/endpoints';
import { ITaxAnalystsPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getTaxAnalystsPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: ITaxAnalystsPage }>(convertApiUrl(GET_TAX_ANALYSTS_PAGE, paramaters))
    .then((res) => res.data);
};
