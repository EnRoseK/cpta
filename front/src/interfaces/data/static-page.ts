export interface IStaticPage {
  id: number;
  slug: string;
  pageTitle: string;
  pageDescription?: string;
  pageContent: string;
  locale: string;
}
