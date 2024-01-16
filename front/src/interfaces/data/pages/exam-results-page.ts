import { IAttachment, IPage } from '../general';

export interface IExamResultsPage extends IPage {
  grantRightExamSection: IGrantRightExam;
  challengeExamSection: IChallengeExam;
  licenseExtendSection: ILicenseExtendExam;
}

export interface IGrantRightExam {
  id: number;
  subTitle?: string;
  title?: string;
  date?: string;
  results: { id: number; excelFile: IAttachment }[];
}

export interface IChallengeExam {
  id: number;
  subTitle?: string;
  title?: string;
  date?: string;
  results: { id: number; excelFile: IAttachment }[];
}

export interface ILicenseExtendExam {
  id: number;
  title?: string;
  leftTitleOne?: string;
  leftTitleTwo?: string;
  rightTitle?: string;
  picture?: IAttachment;
}
