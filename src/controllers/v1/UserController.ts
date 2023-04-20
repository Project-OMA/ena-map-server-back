import { NextFunction, Request, Response } from 'express';
import UserService from '../../services/UserService';
import User, { CreateUser, ReadUser, UpdateUser } from '../../entities/User';

class UserController {
  async findAll(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      return res.status(200).json(await UserService.findAll());
    } catch (error: any) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const user: ReadUser = await UserService.findById(parseInt(req.params.id));
      return res.status(200).json(user);
    } catch (error: any) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const data: CreateUser = req.body;
      console.log('teste', data);
      return res.status(201).json(await UserService.create(data));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateUser = req.body;
      return res.status(204).json(await UserService.update(id, data));
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const id = parseInt(req.params.id);
      return res.status(204).json(await UserService.delete(id));
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
