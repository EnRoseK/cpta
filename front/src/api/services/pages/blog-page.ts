import { GET_BLOG_PAGE } from '@/api/endpoints';
import { IBlogPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getBlogPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance.get<{ data: IBlogPage }>(convertApiUrl(GET_BLOG_PAGE, paramaters)).then((res) => res.data);
};
