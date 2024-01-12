import { GET_FAQ_PAGE } from '@/api/endpoints';
import { IFAQPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getFAQPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    populate: ['groupQuestions', 'groupQuestions.questions'],
  };

  return await axiosInstance.get<{ data: IFAQPage }>(convertApiUrl(GET_FAQ_PAGE, paramaters)).then((res) => res.data);
};
