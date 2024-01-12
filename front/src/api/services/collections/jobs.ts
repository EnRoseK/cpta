import { GET_JOBS } from '@/api/endpoints';
import { IJob, IPagination, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getJobs = async ({ locale, page = 1, pageSize = 9 }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    pagination: {
      page,
      pageSize,
    },
    sort: 'createdAt:desc',
  };

  return await axiosInstance
    .get<{ data: IJob[]; meta: { pagination: IPagination } }>(convertApiUrl(GET_JOBS, paramaters))
    .then((res) => res.data);
};
