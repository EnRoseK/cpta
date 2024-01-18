import { GET_TRANSLATIONS, GET_TRANSLATIONS_CATEGORY } from '@/api/endpoints';
import { ITranslations, ITranslationsCategory, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getTranslations = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    sort: 'priority',
    pagination: {
      limit: -1,
    },
    populate: ['category'],
  };

  return await axiosInstance
    .get<{ data: ITranslations[] }>(convertApiUrl(GET_TRANSLATIONS, paramaters))
    .then((res) => res.data);
};

export const getTranslationsCategories = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    pagination: {
      limit: -1,
    },
  };

  return await axiosInstance
    .get<{ data: ITranslationsCategory[] }>(convertApiUrl(GET_TRANSLATIONS_CATEGORY, paramaters))
    .then((res) => res.data);
};
