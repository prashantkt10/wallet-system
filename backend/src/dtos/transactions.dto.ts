import { IsNumber, IsString, IsOptional } from 'class-validator';

export class AddTransaction {
  @IsString()
  public wallet_id: string;

  @IsNumber()
  public amount: number;

  @IsString()
  public description: string;
}

export class GetTransactions {
  @IsString()
  public wallet_id: string;

  @IsString()
  @IsOptional()
  public skip: string;

  @IsString()
  @IsOptional()
  public limit: string;
}
