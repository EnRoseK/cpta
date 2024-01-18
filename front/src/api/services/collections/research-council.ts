import { GET_RESEARCH_COUNCILS } from '@/api/endpoints';
import { IResearchCouncil, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getResearchCouncils = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    sort: 'priority',
    pagination: {
      limit: -1,
    },
    populate: ['picture'],
  };

  return await axiosInstance
    .get<{ data: IResearchCouncil[] }>(convertApiUrl(GET_RESEARCH_COUNCILS, paramaters))
    .then((res) => res.data);
};
