import { GET_SELF_STUDIES, GET_SELF_STUDY_CATEGORIES } from '@/api/endpoints';
import { ISelfStudy, ISelfStudyCategory, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getSelfStudies = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    sort: 'priority',
    pagination: {
      limit: -1,
    },
    populate: ['category'],
  };

  return await axiosInstance
    .get<{ data: ISelfStudy[] }>(convertApiUrl(GET_SELF_STUDIES, paramaters))
    .then((res) => res.data);
};

export const getSelfStudyCategories = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    pagination: {
      limit: -1,
    },
  };

  return await axiosInstance
    .get<{ data: ISelfStudyCategory[] }>(convertApiUrl(GET_SELF_STUDY_CATEGORIES, paramaters))
    .then((res) => res.data);
};
