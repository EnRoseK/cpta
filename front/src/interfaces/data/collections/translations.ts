export interface ITranslations {
  id: number;
  locale: string;
  englishName: string;
  mongolianName: string;
  translators: string;
  translatedYear: string;
  link?: string;
  newTab: boolean;
  category?: ITranslationsCategory;
  priority: number;
}

export interface ITranslationsCategory {
  id: number;
  name: string;
  slug: string;
}
