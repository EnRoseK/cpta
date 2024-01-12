import { IAttachment } from '../general';

export interface IStuff {
  id: number;
  firstName: string;
  lastName: string;
  level: number;
  priority: number;
  locale: string;
  title: string;
  picture: IAttachment;
}
