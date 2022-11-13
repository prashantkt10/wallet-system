import { NextFunction, Request, Response } from 'express';
import TransactionService from '@services/transactions.service';

class WalletController {
  public transactionService = new TransactionService();

  public getTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { wallet_id, skip, limit } = req.query;
      const transactions = await this.transactionService.getTransaction(wallet_id, skip, limit);
      return res.status(200).json({ data: transactions });
    } catch (error) {
      next(error);
    }
  };
}

export default WalletController;
