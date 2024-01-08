import { IAttachment } from '..';

export interface IHonoraryMember {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  priority: number;
  picture: IAttachment;
}
