import { body } from 'express-validator';

const MapBodyCreateValidator = [
  body(['name']).isString(),
  body(['id_owner']).isNumeric(),
  body('files').exists().notEmpty().isArray({ min: 1, max: 5 }),
];
const MapBodyValidator = [body(['name']).isString(), body(['id_owner']).isNumeric()];

export const mapValidator = {
  create: [...MapBodyCreateValidator],
  update: [...MapBodyValidator],
};
