import { IAttachment } from '../general';

export interface ILogoPage {
  id: number;
  pageTitle: string;
  pageDescription?: string;
  locale: string;
  logos: IAttachment[];
}
