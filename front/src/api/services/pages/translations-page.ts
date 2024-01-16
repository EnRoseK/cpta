import { GET_TRANSLATIONS_PAGE } from '@/api/endpoints';
import { ITranslationsPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getTranslationsPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: ITranslationsPage }>(convertApiUrl(GET_TRANSLATIONS_PAGE, paramaters))
    .then((res) => res.data);
};
