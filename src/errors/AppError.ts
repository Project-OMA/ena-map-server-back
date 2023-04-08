interface AppError {
    status: Number,
    name: string,
    message: string 
}

class AppError implements AppError, Error {
    constructor(status: Number, message: string){
        this.status = status;
        this.message = message;
    }
}

export default AppError;