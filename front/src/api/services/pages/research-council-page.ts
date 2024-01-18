import { GET_RESEARCH_COUNCIL_PAGE } from '@/api/endpoints';
import { IResearchCouncilPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getResearchCouncilPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: IResearchCouncilPage }>(convertApiUrl(GET_RESEARCH_COUNCIL_PAGE, paramaters))
    .then((res) => res.data);
};
