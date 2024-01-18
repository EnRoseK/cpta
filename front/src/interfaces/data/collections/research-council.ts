import { IAttachment } from '..';

export interface IResearchCouncil {
  id: number;
  locale: string;
  picture: IAttachment;
  firstName: string;
  lastName: string;
  text: string;
}
