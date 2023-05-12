import { body } from 'express-validator';

const MapBodyValidator = [body(['name']).isString(), body(['id_owner']).isNumeric()];

export const mapValidator = {
  create: [...MapBodyValidator],
  update: [...MapBodyValidator],
};
