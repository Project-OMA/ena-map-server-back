import { param, body } from 'express-validator';
import { expressValidator } from './validator';

const UserBodyValidator = [body(['name', 'email', 'password']).isString(), body(['type']).isNumeric()];

export const userValidator = {
  create: [...UserBodyValidator],
};
