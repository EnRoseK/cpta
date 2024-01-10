import { IPagination, ITaxAnalyst, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_ALL_TAX_ANALYSTS } from '../endpoints';

export const getPaginatedTaxAnalysts = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    pagination: {
      limit: -1,
    },
    sort: 'createdAt:desc',
    populate: ['picture'],
  };

  return await axiosInstance
    .get<{ data: ITaxAnalyst[]; meta: { pagination: IPagination } }>(convertApiUrl(GET_ALL_TAX_ANALYSTS, paramaters))
    .then((res) => res.data);
};
