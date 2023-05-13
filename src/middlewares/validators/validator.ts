import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import AppError from '../../errors/AppError';
import { userValidator } from './userValidator';
import { mapValidator } from './mapValidator';
import { groupValidator } from './groupValidator';

export const expressValidator = (req: Request, res: Response, next: NextFunction): void | Response => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  return next();
};

export const idParamValidator = [param('id').isString()];

export const validators = {
  idParamValidator,
  userValidator,
  mapValidator,
  groupValidator
};
