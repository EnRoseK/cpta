import { GET_HONORARY_MEMBER_PAGE } from '@/api/endpoints';
import { IHonoraryMemberPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';

export const getHonoraryMemberPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
  };

  return await axiosInstance
    .get<{ data: IHonoraryMemberPage }>(convertApiUrl(GET_HONORARY_MEMBER_PAGE, paramaters))
    .then((res) => res.data);
};
