import { axiosInstance } from '@/libs';
import { GET_ALL_BLOG_CATEGORIES, GET_PAGINATED_BLOGS } from '../endpoints';
import { IBlog, IBlogCategory, IPagination, QueryFilters, QueryParamaters } from '@/interfaces';
import { convertApiUrl } from '@/utils';

export const getAllBlogCategories = async ({ locale }: QueryFilters) => {
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

export const getPaginatedBlogs = async ({ locale, page = 1, pageSize = 10 }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    pagination: {
      page,
      pageSize,
    },
    locale,
    populate: ['thumbnail'],
    sort: 'createdAt:desc',
  };

  return await axiosInstance
    .get<{ data: IBlog[]; meta: { pagination: IPagination } }>(convertApiUrl(GET_PAGINATED_BLOGS, paramaters))
    .then((res) => res.data);
};
