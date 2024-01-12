import { IGreeting, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_GREETINGS } from '../../endpoints';

export const getGreetings = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    pagination: {
      limit: -1,
    },
    populate: ['picture'],
    sort: 'priority',
  };

  return await axiosInstance
    .get<{ data: IGreeting[] }>(convertApiUrl(GET_GREETINGS, paramaters))
    .then((res) => res.data);
};
