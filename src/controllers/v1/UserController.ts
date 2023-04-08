import { NextFunction, Request, Response } from "express";
import UserService from "../../services/UserService";
import { tb_usuario } from "@prisma/client";

class UserController {

    async findAll(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            res.status(200).json(await UserService.findAll());
        } catch(error: any){
            next(error);
        }
    }
    
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const user : tb_usuario = await UserService.findById(parseInt(req.params.id));
            return res.status(200).json(user);
        } catch(error: any){
            next(error);
        }
    }
}

export default new UserController();