import Joi from 'joi';
import { mongoId, password } from './common.validation.js';

export const createUser = {
  body: Joi.object().keys({
    username: Joi.string().max(20).required(),
    password: Joi.string().required().custom(password),
    email: Joi.string().required().email(),
  }),
};

export const updateUser = {
  body: Joi.object().keys({
    id: Joi.string().custom(mongoId),
    email: Joi.string(),
    password: Joi.string().custom(password),
  }),
};

export const deleteUser = {
  query: Joi.object().keys({
    id: Joi.string().custom(mongoId),
  }),
};

export const addProductToFridge = {
  body: Joi.object().keys({
    name: Joi.string().max(80).required(),
    amount: Joi.number().min(0.001).required(),
    alertAmount: Joi.number().min(0).required(),
  }),
};

export const removeProductFromFridge = {
  body: Joi.object().keys({
    name: Joi.string().max(80).required(),
  }),
};
