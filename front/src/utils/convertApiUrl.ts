import { QueryParamaters } from '@/interfaces';
import qs from 'qs';

export const convertApiUrl = (url: string, queryParamaters: QueryParamaters) => {
  return url + '?' + qs.stringify(queryParamaters);
};
