import { IAttachment } from '../general';

export interface ITaxAnalyst {
  id: number;
  tmzNumber: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  picture: IAttachment;
}
