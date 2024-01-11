import { IFooter, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_FOOTER } from '../endpoints';

export const getFooter = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    populate: ['menuItems'],
  };

  return await axiosInstance.get<{ data: IFooter }>(convertApiUrl(GET_FOOTER, paramaters)).then((res) => res.data);
};
