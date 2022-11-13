import { HttpException } from '@exceptions/HttpException';
import transactionModel from '@models/transactions.model';
import { getSkipLimit } from '@utils/util';
import { TransactionType } from '@/constants/constants';
import { Transaction } from '@/interfaces/transactions.interface';

class TransactionService {
  public transactions = transactionModel;

  private parseNewTransactionData(addTransactionData: Transaction): Transaction {
    const newTransactionRecord = {
      ...addTransactionData,
      type: TransactionType.Credit,
    };
    if (addTransactionData.amount < 0) newTransactionRecord['type'] = TransactionType.Debit;
    return newTransactionRecord;
  }

  public async addTransaction(addTransactionData: Transaction): Promise<Transaction | HttpException> {
    const newTransaction: Transaction = this.parseNewTransactionData(addTransactionData);
    const createdTransaction: Transaction = await this.transactions.create(newTransaction);
    if (!createdTransaction) throw new HttpException(500, 'Failed to add new transaction !');
    return createdTransaction;
  }

  public async getTransaction(walletId: any, qskip: any, qlimit: any) {
    const { skip, limit } = getSkipLimit(qskip, qlimit);
    return this.transactions.find({ wallet_id: walletId }).skip(skip).limit(limit);
  }
}

export default TransactionService;
