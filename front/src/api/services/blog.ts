import { axiosInstance } from '@/libs';
import { GET_ALL_BLOG_CATEGORIES } from '../endpoints';
import { IBlogCategory, QueryParamaters } from '@/interfaces';
import { convertApiUrl } from '@/utils';

export const getAllBlogCategories = async ({ locale }: { locale: string }) => {
  const paramaters: QueryParamaters = {
    pagination: {
      limit: -1,
    },
    locale,
  };

  return await axiosInstance
    .get<{ data: IBlogCategory[] }>(convertApiUrl(GET_ALL_BLOG_CATEGORIES, paramaters))
    .then((res) => res.data);
};
