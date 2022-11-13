export interface Transaction {
  _id?: string;
  wallet_id?: string;
  amount?: number;
  balance?: number;
  type?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
