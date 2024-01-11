import { IAboutUsPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_ABOUT_US_PAGE } from '../endpoints';

export const getAboutUsPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    populate: ['picture', 'visions'],
  };

  return await axiosInstance
    .get<{ data: IAboutUsPage }>(convertApiUrl(GET_ABOUT_US_PAGE, paramaters))
    .then((res) => res.data);
};
