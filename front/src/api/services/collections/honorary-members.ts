import { IHonoraryMember, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_ALL_HONORARY_MEMBERS } from '../../endpoints';

export const getAllHonoraryMembers = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    pagination: {
      limit: -1,
    },
    sort: 'priority',
    populate: ['picture'],
  };

  return await axiosInstance
    .get<{ data: IHonoraryMember[] }>(convertApiUrl(GET_ALL_HONORARY_MEMBERS, paramaters))
    .then((res) => res.data);
};
