import { body } from 'express-validator';

const GroupBodyValidator = [
  body(['name']).isString(), 
  body(['id_owner']).isNumeric(), 
  body(['users']).optional().isArray(),
  body(['maps']).optional().isArray()
];

export const groupValidator = {
  create: [...GroupBodyValidator],
  update: [...GroupBodyValidator]
};
