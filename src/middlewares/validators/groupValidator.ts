import { body } from 'express-validator';

const GroupBodyValidator = [body(['name']).isString(), body(['id_owner']).isNumeric()];

export const groupValidator = {
  create: [...GroupBodyValidator],
  update: [...GroupBodyValidator]
};
