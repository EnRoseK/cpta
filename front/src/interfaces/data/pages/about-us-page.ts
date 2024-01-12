import { IAttachment } from '../general';

export interface IAboutUsPage {
  id: number;
  pageTitle: string;
  pageDescription?: string;
  smallTitle?: string;
  subSmallTitle?: string;
  description?: string;
  picture?: IAttachment;
  visions?: { title: string; content: string }[];
}
