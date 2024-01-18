export interface IResearch {
  id: number;
  locale: string;
  topicName: string;
  names: string;
  year: string;
  link?: string;
  newTab: boolean;
  category?: IResearchCategory;
  priority: number;
}

export interface IResearchCategory {
  id: number;
  locale: string;
  name: string;
  slug: string;
}
