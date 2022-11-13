import App from '@/app';
import WalletRoute from '@routes/wallet.route';
import TransactionRoute from '@routes/transactions.route';
import validateEnv from '@utils/validateEnv';
import { logger } from './utils/logger';

validateEnv();

const app = new App([new WalletRoute(), new TransactionRoute()]);

app.listen();

process.on('uncaughtException', err => logger.error('uncaughtException: ', JSON.stringify(err)));
process.on('unhandledRejection', err => logger.error('unhandledRejection: ', JSON.stringify(err)));
