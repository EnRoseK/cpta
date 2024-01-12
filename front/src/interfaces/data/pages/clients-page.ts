import { IPage } from '../general';

export interface IClientsPage extends IPage {
  verifiedTitle?: string;
  verifiedSubTitle?: string;
  unverifiedTitle?: string;
  verified: string;
  unverified: string;
}
