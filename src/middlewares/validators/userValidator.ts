import { body } from 'express-validator';

const UserBodyValidator = [body(['name', 'email', 'password']).isString(), body(['type']).isNumeric()];

const UserAuthValidator = [body(['email', 'password']).isString()];

export const userValidator = {
  create: [...UserBodyValidator],
  update: [...UserBodyValidator],
  auth: [...UserAuthValidator],
};
