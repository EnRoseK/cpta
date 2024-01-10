import { IAttachment } from '..';

export interface ITaxAnalyst {
  id: number;
  tmzNumber: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  picture: IAttachment;
}
