import Joi from 'joi';
import { mongoId } from './common.validation.js';
import { recipes } from '../config/index.js';

export const findRecipes = {
  body: Joi.object().keys({
    sources: Joi.array()
      .items(Joi.string().valid(...Object.values(recipes.sources)))
      .required()
      .min(1),
    categories: Joi.array()
      .items(Joi.string().valid(...Object.values(recipes.categories)))
      .empty(Joi.array().length(0))
      .default(Object.values(recipes.categories)),
    groups: Joi.array()
      .items(Joi.string().valid(...Object.values(recipes.groups)))
      .empty(Joi.array().length(0))
      .default(Object.values(recipes.groups)),
  }),
};

export const getRecipe = {
  params: Joi.object().keys({
    recipeId: Joi.custom(mongoId).required(),
  }),
};

export const postRecipe = {
  file: Joi.object().keys({
    fieldname: Joi.string().valid('image'),
    originalname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string().valid('image/jpeg', 'image/jpg', 'image/png'),
    destination: Joi.string(),
    filename: Joi.string(),
    path: Joi.string(),
    size: Joi.number().max(recipes.MAX_RECIPE_IMAGE_SIZE),
  }),
  body: Joi.object().keys({
    recipeId: Joi.when(Joi.ref('...file'), {
      is: Joi.required(),
      then: Joi.string().custom(mongoId), // If file exist
      otherwise: Joi.string().required().custom(mongoId), // If file not exist
    }),
    recipe: Joi.object().keys({
      name: Joi.string().max(80).required(),
      preparationTime: Joi.number().min(0).required(),
      cookingTime: Joi.number().min(0).required(),
      totalTime: Joi.number().min(0).required(),
      portions: Joi.number().min(1).required(),
      products: Joi.array()
        .items(
          Joi.object().keys({
            product: Joi.string().custom(mongoId).required(),
            amount: Joi.number().min(0).required(),
          })
        )
        .min(1)
        .required(),
      description: Joi.string().required(),
      category: Joi.string()
        .valid(...Object.values(recipes.categories))
        .required(),
      group: Joi.string()
        .valid(...Object.values(recipes.groups))
        .required(),
      image: Joi.when(Joi.ref('...recipeId'), {
        is: Joi.required(),
        then: Joi.string().required().min(14), // If recipeId exist
        otherwise: Joi.forbidden(), // If recipeId not exist
      }),
    }),
  }),
};

export const deleteRecipe = {
  params: Joi.object().keys({
    id: Joi.custom(mongoId).required(),
  }),
};
