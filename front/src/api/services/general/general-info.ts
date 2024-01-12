import { IGeneralInfo, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_GENERAL_INFO } from '../../endpoints';

export const getGeneralInfo = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: IGeneralInfo }>(convertApiUrl(GET_GENERAL_INFO, paramaters))
    .then((res) => res.data);
};
