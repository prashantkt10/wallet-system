import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import WalletController from '@/controllers/wallet.controller';
import { AddTransactionBodyDto, AddTransactionParamDto, GetWalletDto, SetupWalletDto } from '@/dtos/wallet.dto';

class WalletRoute implements Routes {
  public path = '/wallet';
  public router = Router();
  public walletController = new WalletController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/setup`, validationMiddleware(SetupWalletDto, 'body'), this.walletController.setupWallet);
    this.router.get(`${this.path}/:walletId`, validationMiddleware(GetWalletDto, 'params'), this.walletController.getWallet);
    this.router.post(
      `${this.path}/transact/:walletId`,
      validationMiddleware(AddTransactionParamDto, 'params'),
      validationMiddleware(AddTransactionBodyDto, 'body'),
      this.walletController.makeTransaction,
    );
  }
}

export default WalletRoute;
