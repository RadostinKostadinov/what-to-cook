import Joi from 'joi';
import { password } from './common.validation.js';

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};
