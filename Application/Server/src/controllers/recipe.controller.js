import httpStatus from 'http-status';
import { Types } from 'mongoose';
import { unlink } from 'node:fs';

import * as recipeService from '../services/recipe.service.js';
import catchAsync from '../utils/error_handler/catchAsync.js';
import unifiedResponse from '../utils/unifiedResponse.js';
import logger from '../config/logger.js';

// Find recipes by query (category, group & source)
export const findRecipes = catchAsync(async (req, res) => {
  const { categories, groups, sources } = req.validatedData.body;
  const recipes = await recipeService.findRecipes(req.user.id, sources, categories, groups);

  return res.status(httpStatus.OK).json(unifiedResponse.success(httpStatus.OK, 'Recipes found', { recipes }));
});

// Add new recipe to current user recipes list
export const createRecipe = catchAsync(async (req, res) => {
  const recipeData = {
    ...req.validatedData.body.recipe,
    owner: req.user.id,
  };

  // Store old image name, to delete it after successful update
  let recipeOldImage = null;
  if (req.validatedData.body.recipeId && req.validatedData.file) {
    recipeOldImage = req.validatedData.body.recipe.image;
  }

  if (req.validatedData.file) {
    recipeData.image = req.validatedData.file.filename;
  }

  await recipeService.postRecipe(
    { ...recipeData, owner: req.user.id },
    req.validatedData.body.recipeId || new Types.ObjectId()
  );

  // If update successful and there is a new recipe image, delete the old one
  if (req.validatedData.file && recipeOldImage) {
    // delete old image
    const imagePath = `./public/images/${recipeOldImage}`;
    unlink(imagePath, (err) => {
      if (err) {
        logger.warn(err);
      } else {
        logger.info(`successfully deleted ${imagePath}`);
      }
    });
  }

  return res.status(httpStatus.CREATED).json(unifiedResponse.success(httpStatus.CREATED, 'Recipe posted!', {}));
});

// Get current user recipes
export const getCurrentUserRecipes = catchAsync(async (req, res) => {
  const currentUserRecipes = await recipeService.getUserRecipes(req.user.id);

  return res
    .status(httpStatus.OK)
    .json(unifiedResponse.success(httpStatus.OK, 'Current user recipes', { recipes: currentUserRecipes }));
});

// Delete current user recipe by ID
export const deleteCurrentUserRecipe = catchAsync(async (req, res) => {
  const deletedRecipe = await recipeService.deleteUserRecipe(req.user.id, req.validatedData.params.id);

  const imagePath = `./public/images/${deletedRecipe.image}`;
  unlink(imagePath, (err) => {
    if (err) {
      logger.warn(err);
    } else {
      logger.info(`successfully deleted ${imagePath}`);
    }
  });

  return res.status(httpStatus.OK).json(unifiedResponse.success(httpStatus.OK, 'Recipe deleted', {}));
});
