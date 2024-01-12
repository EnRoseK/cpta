import { IStatistic, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_STATISTICS } from '../../endpoints';

export const getStatistics = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    pagination: {
      page: 1,
      pageSize: 4,
    },
    sort: 'priority',
  };

  return await axiosInstance
    .get<{ data: IStatistic[] }>(convertApiUrl(GET_STATISTICS, paramaters))
    .then((res) => res.data);
};
