import express from 'express';
import multer from 'multer';

import { validateReqData } from '../middlewares/validateReqData.js';
import * as RecipeValidations from '../validations/recipe.validation.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import * as recipeController from '../controllers/recipe.controller.js';

// ---------- MULTER CONFIG - start
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
// ---------- MULTER CONFIG - end

const router = express.Router();

router.post('/', isAuthenticated, validateReqData(RecipeValidations.findRecipes), recipeController.findRecipes);
router.get('/user/', isAuthenticated, recipeController.getCurrentUserRecipes);
router.get('/:recipeId', isAuthenticated, validateReqData(RecipeValidations.getRecipe), recipeController.getRecipe);
router.post(
  '/user/',
  isAuthenticated,
  upload.single('image'),
  validateReqData(RecipeValidations.postRecipe),
  recipeController.createRecipe
);
router.delete(
  '/user/:id',
  isAuthenticated,
  validateReqData(RecipeValidations.deleteRecipe),
  recipeController.deleteCurrentUserRecipe
);

export default router;
