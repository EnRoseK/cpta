import { GET_EXAM_RESULTS_PAGE } from '@/api/endpoints';
import { IExamResultsPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getExamResultsPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: IExamResultsPage }>(convertApiUrl(GET_EXAM_RESULTS_PAGE, paramaters))
    .then((res) => res.data);
};
