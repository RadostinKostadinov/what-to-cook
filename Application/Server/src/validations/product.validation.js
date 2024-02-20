import Joi from 'joi';
import { productsConfig } from '../config/index.js';

export const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().max(80).required(),
    measurementUnit: Joi.string()
      .valid(...Object.values(productsConfig.productMeasurementUnits))
      .required(),
  }),
};
