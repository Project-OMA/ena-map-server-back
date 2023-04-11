import { Request, Response, NextFunction } from "express"

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json({status: error.status || 500, message: error.message});
    next();
};

export default errorHandler;