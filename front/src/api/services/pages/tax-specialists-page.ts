import { GET_TAX_SPECIALISTS_PAGE } from '@/api/endpoints';
import { ITaxSepcialistsPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getTaxSpecialistsPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: ITaxSepcialistsPage }>(convertApiUrl(GET_TAX_SPECIALISTS_PAGE, paramaters))
    .then((res) => res.data);
};
