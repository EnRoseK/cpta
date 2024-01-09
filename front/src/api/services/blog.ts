import { axiosInstance } from '@/libs';
import { GET_ALL_BLOG_CATEGORIES, GET_BLOG_BY_SLUG, GET_BLOG_SLUGS, GET_PAGINATED_BLOGS } from '../endpoints';
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

export const getPaginatedBlogs = async ({ locale, page = 1, pageSize = 10, filters }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    pagination: {
      page,
      pageSize,
    },
    locale,
    populate: ['thumbnail'],
    sort: 'createdAt:desc',
  };

  if (filters) {
    paramaters.filters = filters;
  }

  return await axiosInstance
    .get<{ data: IBlog[]; meta: { pagination: IPagination } }>(convertApiUrl(GET_PAGINATED_BLOGS, paramaters))
    .then((res) => res.data);
};

export const getBlogSlugs = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    pagination: {
      limit: -1,
    },
    fields: ['slug', 'locale'],
  };

  return await axiosInstance.get<{ data: IBlog[] }>(convertApiUrl(GET_BLOG_SLUGS, paramaters)).then((res) => res.data);
};

export const getBlogBySlug = async (slug: string) => {
  return await axiosInstance.get<{ data: IBlog }>(GET_BLOG_BY_SLUG(slug)).then((res) => res.data);
};
