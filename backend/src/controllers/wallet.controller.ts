import { NextFunction, Request, Response } from 'express';
import { Wallet } from '../interfaces/wallet.interface';
import WalletService from '../services/wallet.service';
import { Transaction } from '../interfaces/transactions.interface';
import { roundAccurately } from '../utils/util';

class WalletController {
  public walletService = new WalletService();

  public setupWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const setupWalletData: Wallet = req.body;
      if(setupWalletData.balance<1) return res.status(400).json({ message: 'Invalid amount !' });
      setupWalletData.balance = roundAccurately(setupWalletData.balance, 4);
      const newWallet: Wallet = await this.walletService.setupWallet(setupWalletData);
      return res.status(201).json({ data: newWallet, message: 'Wallet setup successful !' });
    } catch (error) {
      next(error);
    }
  };

  public getWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const walletId: string = req.params?.walletId;
      const wallet: Wallet = await this.walletService.getWalletById(walletId);
      return res.status(200).json({ data: wallet, message: 'Wallet found !' });
    } catch (error) {
      next(error);
    }
  };

  public makeTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const walletId: string = req.params?.walletId;
      const transactionData: Transaction = req.body;
      if(transactionData.balance<1) return res.status(400).json({ message: 'Invalid amount !' });
      transactionData.balance = roundAccurately(transactionData.balance, 4);
      const updatedWallet = await this.walletService.addAmountToWalletAndTransaction(walletId, transactionData);
      return res.status(200).json({ data: updatedWallet, message: 'Transaction done !' });
    } catch (error) {
      next(error);
    }
  };
}

export default WalletController;
