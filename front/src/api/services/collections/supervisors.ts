import { GET_SUPERVISORS } from '@/api/endpoints';
import { IStuff, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getSupervisors = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    populate: ['picture'],
    pagination: {
      limit: -1,
    },
  };

  return await axiosInstance
    .get<{ data: IStuff[] }>(convertApiUrl(GET_SUPERVISORS, paramaters))
    .then((res) => res.data);
};
