import { IAttachment } from '..';

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
