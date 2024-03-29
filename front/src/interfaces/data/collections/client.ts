import { IAttachment } from '../general';

export interface IClient {
  id: number;
  name: string;
  expirationDate: string;
  ceoName: string;
  address: string;
  emailOne: string;
  emailTwo: string;
  phoneOne: string;
  phoneTwo: string;
  logo: IAttachment;
  isExpired: boolean;
  website?: string;
}
