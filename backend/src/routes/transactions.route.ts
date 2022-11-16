import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import TransactionController from '../controllers/transactions.controller';
import { GetTransactions } from '../dtos/transactions.dto';

class WalletRoute implements Routes {
  public path = '/transactions';
  public router = Router();
  public transactionController = new TransactionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, validationMiddleware(GetTransactions, 'query'), this.transactionController.getTransaction);
  }
}

export default WalletRoute;
