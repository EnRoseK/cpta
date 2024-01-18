import { GET_RESEARCHS, GET_RESEARCH_CATEGORIES } from '@/api/endpoints';
import { IResearch, IResearchCategory, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getResearchs = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    sort: 'priority',
    populate: ['category'],
    pagination: {
      limit: -1,
    },
  };

  return await axiosInstance
    .get<{ data: IResearch[] }>(convertApiUrl(GET_RESEARCHS, paramaters))
    .then((res) => res.data);
};

export const getResearchCategories = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    pagination: {
      limit: -1,
    },
  };

  return await axiosInstance
    .get<{ data: IResearchCategory[] }>(convertApiUrl(GET_RESEARCH_CATEGORIES, paramaters))
    .then((res) => res.data);
};
