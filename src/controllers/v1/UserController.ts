import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../../entities/User';
import { CrudController } from './CrudController';
import { userService } from '../../services/UserService';
import { IAuthenticate } from '../../types/userTypes';
import deleteFile from '../../utils/deleteFile';

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
      const id = parseInt(req.params.id);
      return res.status(200).json(await userService.getByGroupId(id));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public createByFile = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    let file: any | null = req.file || null;

    if (!file || !file.filename || !file.path) {
      return res.status(400).json({ status: 400, message: 'Erro! Arquivo não encontrado' });
    }

    try {
      return res.status(200).json(await userService.createByFile(file));
    } catch (error) {
      console.error(error);
      next(error);
    } finally {
      deleteFile(file.filename);
    }
  };

  public override create = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      return res.status(200).json(await userService.createCustom(req.body));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public override update = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const requestToken: string = req.headers['authorization'] || '';
      const id = parseInt(req.params.id);
      return res.status(200).json(await userService.updateCustom(id, req.body, requestToken));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export const userController = new UserController(userService);
