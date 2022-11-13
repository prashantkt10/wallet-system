import { IsNumber, IsString } from 'class-validator';

export class SetupWalletDto {
  @IsString()
  public name: string;

  @IsNumber()
  public balance: number;
}

export class GetWalletDto {
  @IsString()
  public walletId: string;
}

export class AddTransactionParamDto {
  @IsString()
  public walletId: string;
}

export class AddTransactionBodyDto {
  @IsNumber()
  public amount: Number;

  @IsString()
  public description: string;
}
