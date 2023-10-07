import { body, param } from 'express-validator';

const GroupBodyValidator = [
  body(['name']).isString(),
  body(['id_owner']).isNumeric(),
  body(['users']).optional().isArray(),
  body(['maps']).optional().isArray(),
];

const GroupBodyUpdateValidator = [
  param('id').isString(),
  body(['name']).isString(),
  body(['users']).optional().isArray(),
  body(['maps']).optional().isArray(),
];

const GroupBodyUserMapsValidator = [
  param('email').isString(),
];


export const groupValidator = {
  create: [...GroupBodyValidator],
  update: [...GroupBodyUpdateValidator],
  userMaps: [...GroupBodyUserMapsValidator]
};
