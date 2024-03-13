/* eslint-disable no-param-reassign */
import httpStatus from 'http-status';
import Recipe from '../database/models/recipe.model.js';
import DatabaseError from '../utils/error_handler/error_types/DatabaseError.js';

export const postRecipe = async (recipeBody, recipeId) => {
  try {
    return await Recipe.updateOne({ _id: recipeId }, recipeBody, { upsert: true });
  } catch (error) {
    throw new DatabaseError(
      'CREATE_RECIPE__INVALID_BODY',
      httpStatus.BAD_REQUEST,
      true,
      `The data sent to the database was invalid. - DB_RES: ${error.message}`
    );
  }
};

export const getUserRecipes = async (userId) => {
  try {
    return await Recipe.find({ owner: userId }).populate('products.product');
  } catch (error) {
    throw new DatabaseError(
      'GET_USER_RECIPES_ERROR',
      httpStatus.BAD_REQUEST,
      true,
      `The data sent to the database was invalid. - DB_RES: ${error.message}`
    );
  }
};

export const deleteUserRecipe = async (userId, recipeId) => {
  try {
    return await Recipe.findOneAndDelete({ owner: userId, _id: recipeId });
  } catch (error) {
    throw new DatabaseError(
      'DELETE_USER_RECIPE_ERROR',
      httpStatus.BAD_REQUEST,
      true,
      `The data sent to the database was invalid. - DB_RES: ${error.message}`
    );
  }
};
