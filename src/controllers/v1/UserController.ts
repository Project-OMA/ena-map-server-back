import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../../entities/User';
import { CrudController } from './CrudController';
import { userService } from '../../services/UserService';
import { IAuthenticate } from '../../types/userTypes';
import deleteFile from '../../utils/deleteFile';
import { userMapService } from '../../services/UserMapService';

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

  public checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      return res.status(200).json({status: 'success'});
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

  public updateMapUserByEmail = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const email = req.params.email;
      const idMap = parseInt(req.params.idMap);

      return res.status(200).json(await userMapService.updateByUser(email, idMap));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public findAllPaged = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const search = req.query.search !== undefined ? String(req.query.search) : "";
      const page = req.query.page !== undefined ? String(req.query.page) : "1";
      const limit = req.query.limit !== undefined ? String(req.query.limit) : "10";
      const userTypes = req.query.userTypes ? String(req.query.userTypes).split(",").map(Number) : undefined;

      return res.status(200).json(await userService.findAllPaged(req, page, limit, search, userTypes));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export const userController = new UserController(userService);
