import { IAttachment } from '../general';

export interface ILogoPage {
  id: number;
  pageTitle: string;
  pageDescription?: string;
  locale: string;
  logoImages: ILogoImage[];
}

export interface ILogoImage {
  id: number;
  image: IAttachment;
}
