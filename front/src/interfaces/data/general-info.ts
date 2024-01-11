export interface IGeneralInfo {
  phone: string;
  email: string;
  website: string;
  address: string;
  workingHours: string;
  bankAccounts: IBankAccount[];
}

export interface IBankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
  transferValue: string;
  eBarimt: string;
}
