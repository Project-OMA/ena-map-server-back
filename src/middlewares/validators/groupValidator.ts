import { body, param, query } from 'express-validator';

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

const GroupMapsByUserValidator = [
  query('limit').exists().isString(),
  query('offset').exists().isString(),
  param('idGroup').isString(),
  param('idUser').isString(),
];


export const groupValidator = {
  create: [...GroupBodyValidator],
  update: [...GroupBodyUpdateValidator],
  userMaps: [...GroupBodyUserMapsValidator],
  mapsByUser: [...GroupMapsByUserValidator]
};
