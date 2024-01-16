import { IPage } from '../general';

export interface IRulesAndRegulationsPage extends IPage {
  rules: IRule[];
  regulations: IRegulation[];
}

export interface IRule {
  id: number;
  title: string;
  description: string;
  link?: string;
  newTab: boolean;
}

export interface IRegulation {
  id: number;
  title: string;
  description: string;
  link?: string;
  newTab: boolean;
}
