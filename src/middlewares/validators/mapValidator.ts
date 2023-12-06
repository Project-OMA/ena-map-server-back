import { body, param } from 'express-validator';

const MapBodyCreateValidator = [
  body(['name']).isString(),
  body(['id_owner']).isNumeric(),
  body('files').exists().notEmpty().isArray({ min: 1, max: 5 }),
];

const MapBodyUpdateValidator = [
  param('id').isString(),
  body(['name']).isString(),
  body(['id_owner']).isNumeric(),
  body(['new_file']).isString(),
  body(['last_file_name']).isString(),
  // body('files').optional().notEmpty().isArray({ min: 1, max: 5 }),
];
const MapBodyValidator = [body(['name']).isString(), body(['id_owner']).isNumeric()];

export const mapValidator = {
  create: [...MapBodyCreateValidator],
  update: [...MapBodyUpdateValidator],
};
