import { IBankAccountsPage, QueryFilters, QueryParamaters } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_BANK_ACCOUNTS_PAGE } from '../../endpoints';

export const getBankAccountsPage = async ({ locale }: QueryFilters) => {
  const paramaters: QueryParamaters = {
    locale,
    populate: ['bankAccounts'],
  };

  return await axiosInstance
    .get<{ data: IBankAccountsPage }>(convertApiUrl(GET_BANK_ACCOUNTS_PAGE, paramaters))
    .then((res) => res.data);
};
