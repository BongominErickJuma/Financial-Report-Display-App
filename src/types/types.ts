// src/types.ts
export interface Report {
  transactionId: string;
  date: string;
  accountHolderName: string;
  transactionType: string;
  amount: number;
  accountBalance: number;
}
