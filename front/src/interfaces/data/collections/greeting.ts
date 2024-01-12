import { IAttachment } from '../general';

export interface IGreeting {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  content: string;
  picture: IAttachment;
}
