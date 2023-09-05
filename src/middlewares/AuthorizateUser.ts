import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../entities/User';
import { userService } from '../services/UserService';
import AppError from '../errors/AppError';
import jwt from 'jsonwebtoken';
import { UserToken } from '../types/UserToken';
import { JWT_SECRET } from '../constants/EnvironmentVariables';
import { unauthorized } from '../helpers/responseHelper';

const exclusions = ['/auth', '/public'];

const IsToExcludePath = (path: string, exclusionsSelecteds = exclusions) => {
  return exclusionsSelecteds.some((routeToExclude) => {
    return path.includes(routeToExclude);
  });
};

export async function Authentication(req: Request, res: Response, next: NextFunction) {
  try {
    if (IsToExcludePath(req.originalUrl)) {
      return next();
    }

    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (token) {
      const userDecoded: UserToken = jwt.verify(token, JWT_SECRET) as UserToken;
      req.user = userDecoded;
      return next();
    }

    return unauthorized(res);
  } catch (error) {
    return unauthorized(res);
  }
}

export function authorizateUser(userTypes: Number[]) {
  async function rolesAuthorized(req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserToken = req.user;

      const isAuthorized: boolean = userTypes.includes(user.type);

      if (!isAuthorized) {
        return unauthorized(res);
      }

      next();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(401).json({ status: error.status, message: error.message });
      }
      return unauthorized(res);
    }
  }

  return rolesAuthorized;
}
