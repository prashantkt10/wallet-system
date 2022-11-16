import { model, Schema, Document } from 'mongoose';
import { Wallet } from '../interfaces/wallet.interface';

const walletSchema: Schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    balance: {
      type: Schema.Types.Decimal128,
      required: true,
      get: formatBalance,
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

const walletModel = model<Wallet & Document>('Wallet', walletSchema);

export default walletModel;
