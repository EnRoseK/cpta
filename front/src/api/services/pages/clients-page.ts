import { GET_CLIENTS_PAGE } from '@/api/endpoints';
import { IClientsPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getClientsPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: IClientsPage }>(convertApiUrl(GET_CLIENTS_PAGE, paramaters))
    .then((res) => res.data);
};
