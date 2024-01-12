import { IGreetingsPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_GREETINGS_PAGE } from '../../endpoints';

export const getGreetingsPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: IGreetingsPage }>(convertApiUrl(GET_GREETINGS_PAGE, paramaters))
    .then((res) => res.data);
};
