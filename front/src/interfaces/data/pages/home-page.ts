import { IAttachment, ISection } from '../general';

export interface IHomePage {
  id: number;
  pageTitle: string;
  pageDescription?: string;
  locale: string;
  newsSection: ISection;
  clientsSection: ISection;
  cta: IHomeCta[];
}

export interface IHomeCta {
  id: number;
  title: string;
  link: string;
  newTab: boolean;
  icon: IAttachment;
}
