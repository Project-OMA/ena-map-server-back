import { body } from 'express-validator';

const UserCreateValidator = [body(['name', 'email', 'password']).isString(), body(['type']).isNumeric()];
const UserUpdateValidator = [body(['name', 'email']).isString(), body(['password']).optional().isString(), body(['type']).isNumeric()];

const UserAuthValidator = [body(['email', 'password']).isString()];

export const userValidator = {
  create: [...UserCreateValidator],
  update: [...UserUpdateValidator],
  auth: [...UserAuthValidator],
};
