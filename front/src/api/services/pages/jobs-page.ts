import { GET_JOBS_PAGE } from '@/api/endpoints';
import { IJobsPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getJobsPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance.get<{ data: IJobsPage }>(convertApiUrl(GET_JOBS_PAGE, paramaters)).then((res) => res.data);
};
