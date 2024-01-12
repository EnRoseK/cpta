export interface IBankAccountsPage {
  id: number;
  pageTitle: string;
  pageDescription?: string;
  locale: string;
  bankAccounts: IBankAccount[];
}

export interface IBankAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  transferValue: string;
  eBarimt: string;
}
