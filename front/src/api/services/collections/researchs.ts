import { GET_RESEARCHS } from '@/api/endpoints';
import { IResearch, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getResearchs = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    sort: 'createdAt:desc',
  };

  return await axiosInstance
    .get<{ data: IResearch[] }>(convertApiUrl(GET_RESEARCHS, paramaters))
    .then((res) => res.data);
};
