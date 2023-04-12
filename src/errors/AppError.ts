interface AppError {
  status: number;
  name: string;
  message: string;
}

class AppError implements AppError, Error {
  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export default AppError;
