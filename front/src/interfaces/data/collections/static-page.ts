import { IAttachment } from '../general';

export interface IStaticPage {
  id: number;
  slug: string;
  pageTitle: string;
  pageDescription?: string;
  pageContent: string;
  locale: string;
  pdfFiles?: IPDFFile[];
  newSlug: string;
  localizations: IStaticPage[];
}

export interface IPDFFile {
  id: number;
  file: IAttachment;
}
