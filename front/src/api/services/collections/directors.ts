import { GET_DIRECTORS } from '@/api/endpoints';
import { IStuff, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getDirectors = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    populate: ['picture'],
    pagination: {
      limit: -1,
    },
  };

  return await axiosInstance.get<{ data: IStuff[] }>(convertApiUrl(GET_DIRECTORS, paramaters)).then((res) => res.data);
};
