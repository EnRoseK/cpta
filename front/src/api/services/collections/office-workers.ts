import { GET_OFFICE_WORKERS } from '@/api/endpoints';
import { IStuff, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getOfficeWorkers = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    populate: ['picture'],
    pagination: {
      limit: -1,
    },
  };

  return await axiosInstance
    .get<{ data: IStuff[] }>(convertApiUrl(GET_OFFICE_WORKERS, paramaters))
    .then((res) => res.data);
};
