import { GET_SELF_STUDY_PAGE } from '@/api/endpoints';
import { ISelfStudyPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getSelfStudyPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: ISelfStudyPage }>(convertApiUrl(GET_SELF_STUDY_PAGE, paramaters))
    .then((res) => res.data);
};
