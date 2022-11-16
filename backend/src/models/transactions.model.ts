import { model, Schema, Document } from 'mongoose';
import { Transaction } from '../interfaces/transactions.interface';
import { TransactionType } from '../constants/constants';

const transactionsSchema: Schema = new Schema(
  {
    wallet_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Wallet',
    },
    amount: {
      type: Schema.Types.Decimal128,
      required: true,
      get: formatBalance,
    },
    balance: {
      type: Schema.Types.Decimal128,
      required: true,
      get: formatBalance,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      enum: [TransactionType.Credit, TransactionType.Debit],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  },
);

function formatBalance(value) {
  if (typeof value !== 'undefined') {
    return parseFloat(value.toString());
  }
  return value;
}

const transactionsModel = model<Transaction & Document>('Transactions', transactionsSchema);

export default transactionsModel;
