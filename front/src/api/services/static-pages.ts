import { IStaticPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_STATIC_PAGES, GET_STATIC_PAGE_SLUGS } from '../endpoints';

export const getStaticPageSlugs = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    fields: ['slug', 'id', 'locale'],
    pagination: {
      limit: -1,
    },
  };

  return await axiosInstance
    .get<{ data: IStaticPage[] }>(convertApiUrl(GET_STATIC_PAGE_SLUGS, paramaters))
    .then((res) => res.data);
};

export const getStaticPageBySlug = async (slug: string, locale: string) => {
  const paramaters: QueryParamaters = {
    locale,
    pagination: {
      limit: -1,
    },
    filters: {
      slug: { $eq: slug },
    },
    populate: ['files'],
  };

  return await axiosInstance
    .get<{ data: IStaticPage[] }>(convertApiUrl(GET_STATIC_PAGES, paramaters))
    .then((res) => res.data);
};
