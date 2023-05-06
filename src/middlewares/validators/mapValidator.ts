import { body } from 'express-validator';

const MapBodyValidator = [body(['name', 'thumb_url', 'url', 'tag']).isString(), body(['id_owner']).isNumeric()];

export const mapValidator = {
  create: [...MapBodyValidator],
  update: [...MapBodyValidator],
};
