import { IAttachment, IPage } from '../general';

export interface ITaxSepcialistsPage extends IPage {
  smallTitle?: string;
  smallSubTitle?: string;
  files: { id: number; excelFile: IAttachment }[];
}
