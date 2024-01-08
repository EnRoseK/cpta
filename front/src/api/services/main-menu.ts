import { IMainMenuItem, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_ALL_MAIN_MENUS } from '../endpoints';

export const getAllMainMenus = async ({ locale }: { locale: string }) => {
  const paramaters: QueryParamaters = {
    pagination: {
      limit: -1,
    },
    locale,
    sort: 'priority',
    populate: ['child', 'child.items', 'child.menuItems', 'child.menuItems.items'],
  };

  return await axiosInstance
    .get<{ data: IMainMenuItem[] }>(convertApiUrl(GET_ALL_MAIN_MENUS, paramaters))
    .then((res) => res.data);
};
