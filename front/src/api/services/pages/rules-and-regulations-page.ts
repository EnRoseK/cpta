import { GET_RULES_AND_REGULATIONS_PAGE } from '@/api/endpoints';
import { IRulesAndRegulationsPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getRulesAndRegulationPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    populate: ['rules', 'regulations'],
  };

  return await axiosInstance
    .get<{ data: IRulesAndRegulationsPage }>(convertApiUrl(GET_RULES_AND_REGULATIONS_PAGE, paramaters))
    .then((res) => res.data);
};
