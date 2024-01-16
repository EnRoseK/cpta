import { GET_RESEARCH_PAGE } from '@/api/endpoints';
import { IResearchPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getResearchPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: IResearchPage }>(convertApiUrl(GET_RESEARCH_PAGE, paramaters))
    .then((res) => res.data);
};
