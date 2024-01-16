import { GET_LOGO_PAGE } from '@/api/endpoints';
import { ILogoPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getLogoPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    populate: ['logos', 'logoImages', 'logoImages.image'],
  };

  return await axiosInstance.get<{ data: ILogoPage }>(convertApiUrl(GET_LOGO_PAGE, paramaters)).then((res) => res.data);
};
