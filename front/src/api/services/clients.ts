import { IClient, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_CLIENTS } from '../endpoints';

export const getClients = async ({ locale, limit = -1, fields = '*' }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    sort: 'priority',
    pagination: {
      limit,
    },
    populate: ['logo'],
    fields,
  };

  return await axiosInstance.get<{ data: IClient[] }>(convertApiUrl(GET_CLIENTS, paramaters)).then((res) => res.data);
};
