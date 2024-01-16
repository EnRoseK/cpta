import { GET_SELF_STUDIES } from '@/api/endpoints';
import { ISelfStudy, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getSelfStudies = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    sort: 'createdAt:desc',
  };

  return await axiosInstance
    .get<{ data: ISelfStudy[] }>(convertApiUrl(GET_SELF_STUDIES, paramaters))
    .then((res) => res.data);
};
