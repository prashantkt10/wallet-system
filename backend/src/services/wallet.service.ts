import { Wallet } from '@/interfaces/wallet.interface';
import { customError, HttpException } from '@exceptions/HttpException';
import walletModel from '@models/wallet.model';
import { roundAccurately } from '@utils/util';
import TransactionService from './transactions.service';
import mongoose, { ClientSession } from 'mongoose';
import { Transaction } from '@/interfaces/transactions.interface';

class UserService {
  private wallets = walletModel;
  private transactions = new TransactionService();

  public async setupWallet(setupWalletData: Wallet) {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    try {
      const newWallet: Wallet = await this.createWallet(setupWalletData);
      if (!newWallet) throw new Error();
      const newTransactionData = {
        wallet_id: newWallet._id,
        amount: setupWalletData.balance,
        balance: setupWalletData.balance,
        description: 'Transaction added on wallet setup',
      };
      const newTransaction = await this.transactions.addTransaction(newTransactionData);
      if (!newTransaction) throw new Error();
      await session.commitTransaction();
      return newWallet;
    } catch (error) {
      await session.abortTransaction();
      throw new HttpException(500, 'Failed to setup wallet !');
    } finally {
      session.endSession();
    }
  }

  private async createWallet(newWalletData: Wallet) {
    return this.wallets.create(newWalletData);
  }

  private async addBalanceToWalletById(walletId: string, balance: Number) {
    return this.wallets.findByIdAndUpdate(
      {
        _id: walletId,
      },
      { $inc: { balance } },
      { returnDocument: 'after' },
    );
  }

  public async getWalletById(walletId: string) {
    const wallet: Wallet = await this.wallets.findOne({ _id: walletId });
    if (!wallet) throw new HttpException(500, 'Failed to setup new wallet');
    return wallet;
  }

  public async addAmountToWalletAndTransaction(walletId: string, transactionData: Transaction) {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    try {
      if (transactionData.amount === 0) throw customError('IA');
      const wallet: Wallet = await this.getWalletById(walletId);
      if (transactionData.amount < 0) {
        if (roundAccurately(wallet.balance - transactionData.amount * -1, 4) < 0) throw customError('IB');
      }
      const updatedWallet: Wallet = await this.addBalanceToWalletById(wallet._id, transactionData.amount);
      if (!updatedWallet) throw new Error();
      const newTransactionData = {
        wallet_id: updatedWallet._id,
        amount: transactionData.amount,
        balance: updatedWallet.balance,
        description: transactionData.description,
      };
      const newTransaction = await this.transactions.addTransaction(newTransactionData);
      if (!newTransaction) throw new Error();
      await session.commitTransaction();
      return updatedWallet;
    } catch (error) {
      await session.abortTransaction();
      if (error.message === 'IA') throw new HttpException(400, 'Inavlid amount entered !');
      if (error.message === 'IB') throw new HttpException(400, 'Insufficient balance !');
      throw new HttpException(500, 'Failed to make transaction !');
    } finally {
      session.endSession();
    }
  }
}

export default UserService;
