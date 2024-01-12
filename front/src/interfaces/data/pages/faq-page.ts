import { IPage } from '../general';

export interface IFAQPage extends IPage {
  groupQuestions: IGroupQuestion[];
}

export interface IGroupQuestion {
  id: number;
  title: string;
  questions: IQuestion[];
}

export interface IQuestion {
  id: number;
  question: string;
  answer: string;
}
