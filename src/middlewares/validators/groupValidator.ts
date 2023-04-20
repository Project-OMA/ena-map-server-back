import { param, body } from 'express-validator';
import { expressValidator } from './validator';

const GroupBodyValidator = [body(['name']).isString(), body(['id_owner']).isNumeric()];

export const groupValidator = {
  create: [...GroupBodyValidator],
  update: [...GroupBodyValidator],
};
