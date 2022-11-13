export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const customError = message => {
  const err = new Error();
  err.message = message;
  return err;
};
