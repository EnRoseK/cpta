import { IAttachment } from '..';

export interface IBlogCategory {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export interface IBlog {
  id: number;
  title: string;
  description: string;
  slug: string;
  content: string;
  publishedAt: string;
  thumbnail: IAttachment;
}
