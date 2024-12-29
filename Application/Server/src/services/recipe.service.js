/* eslint-disable no-param-reassign */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Recipe from '../database/models/recipe.model.js';
import DatabaseError from '../utils/error_handler/error_types/DatabaseError.js';
import * as userService from './user.service.js';

export const findRecipes = async (userId, sources, categories, groups) => {
  const { products } = await userService.getUserFridge(userId);
  const owners = [];
  sources.forEach((source) => {
    switch (source) {
      case 'лични':
        owners.push(new mongoose.Types.ObjectId(userId));
        break;
      case 'приятели':
        // TODO: push all id's of user's friends into array
        break;
      case 'публични':
        // TODO: push the admin(default recipe creator ID) id into array
        break;
      default:
        break;
    }
  });
  const pipeline = [
    {
      $match: {
        $and: [
          { owner: { $in: owners } },
          { category: { $in: categories } },
          { group: { $in: groups } }],
      },
    },
    {
      $addFields: {
        score: {
          $subtract: [
            {
              $size: {
                $filter: {
                  input: '$products',
                  as: 'product',
                  cond: {
                    $in: [
                      '$$product.product',
                      products.map((product) => product.product._id),
                    ],
                  },
                },
              },
            },
            { $size: '$products' },
          ],
        },
      },
    },
    {
      $sort: {
        score: -1,
      },
    },
    {
      $limit: 100,
    },
  ];

  try {
    const recipes = await Recipe.aggregate(pipeline).exec();

    return recipes;
  } catch (error) {
    throw new DatabaseError(
      'FIND_RECIPES_ERROR',
      httpStatus.BAD_REQUEST,
      true,
      `The data sent to the database was invalid. - DB_RES: ${error.message}`
    );
  }
};

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
