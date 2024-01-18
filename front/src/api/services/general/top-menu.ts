import { GET_TOP_MENU } from '@/api/endpoints';
import { ITopMenu, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getTopMenu = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    sort: 'priority',
    pagination: {
      limit: -1,
    },
  };

  return await axiosInstance.get<{ data: ITopMenu[] }>(convertApiUrl(GET_TOP_MENU, paramaters)).then((res) => res.data);
};
