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

export class FileError implements AppError, Error {
  status: number;
  message: string;
  name: string;
  
  constructor(status: number, message: string, name: string) {
    this.status = status;
    this.message = message;
    this.name = name;
  }
}

export default AppError;
