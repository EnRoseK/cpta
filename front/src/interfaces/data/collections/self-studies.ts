export interface ISelfStudy {
  id: number;
  locale: string;
  topicName: string;
  names: string;
  year: string;
  link?: string;
  newTab: boolean;
  category?: ISelfStudyCategory;
  priority: number;
}

export interface ISelfStudyCategory {
  id: number;
  name: string;
  slug: string;
}
