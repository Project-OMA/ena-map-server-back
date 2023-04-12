import { body } from 'express-validator';

const MapBodyValidator = [body(['name', 'thumb_url', 'url']).isString()];

export const mapValidator = {
  create: [...MapBodyValidator],
  update: [...MapBodyValidator],
};
