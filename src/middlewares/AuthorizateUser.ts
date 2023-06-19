import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../entities/User';
import { userService } from '../services/UserService';
import AppError from '../errors/AppError';

export default function authorizateUser(userTypes: Number[]) {
  async function rolesAuthorized(req: Request, res: Response, next: NextFunction) {
    try {
      const requestToken: string = req.headers['authorization'] || '';
      const user: UserDTO = await userService.getUserByToken(requestToken);

      const isAuthorized: boolean = userTypes.includes(user.type);
      if (!isAuthorized) {
        return res.status(401).json({ status: 401, message: 'Não autorizado! Usuário não permitido para esta ação' });
      }

      next();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(401).json({ status: error.status, message: error.message });
      }
      return res.status(401).json({ status: 401, message: 'Não autenticado! Ocorreu um erro inesperado. ' + error });
    }
  }

  return rolesAuthorized;
}
