import { IHomePage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_HOME_PAGE } from '../../endpoints';

export const getHomePage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    populate: ['newsSection', 'clientsSection', 'cta', 'cta.icon'],
  };

  return await axiosInstance.get<{ data: IHomePage }>(convertApiUrl(GET_HOME_PAGE, paramaters)).then((res) => res.data);
};
