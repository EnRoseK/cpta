import { GET_TRANSLATIONS } from '@/api/endpoints';
import { ITranslations, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getTranslations = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    sort: 'createdAt:desc',
  };

  return await axiosInstance
    .get<{ data: ITranslations[] }>(convertApiUrl(GET_TRANSLATIONS, paramaters))
    .then((res) => res.data);
};
