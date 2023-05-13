import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../../entities/User';
import { CrudController } from './CrudController';
import { userService } from '../../services/UserService';
import { IAuthenticate } from '../../types/userTypes';

class UserController extends CrudController<UserDTO, CreateUserDTO, UpdateUserDTO> {
  public authenticate = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const data: IAuthenticate = req.body;
      return res.status(200).json(await userService.authenticate(data));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public getByGroupId = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const id = parseInt(req.params.id + '');
      return res.status(200).json(await userService.getByGroupId(id));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export const userController = new UserController(userService);
