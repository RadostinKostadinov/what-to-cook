import express from 'express';

import { validateReqData } from '../middlewares/validateReqData.js';
import * as userController from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import * as userValidations from '../validations/user.validation.js';

const router = express.Router();

router.get('/me', isAuthenticated, validateReqData(), userController.getCurrentUser);
router.get('/me/fridge', isAuthenticated, validateReqData(), userController.getCurrentUserFridge);
router.post(
  '/me/fridge',
  isAuthenticated,
  validateReqData(userValidations.addProductToFridge),
  userController.addProductToFridge
);
router.put(
  '/me/fridge',
  isAuthenticated,
  validateReqData(userValidations.addProductToFridge),
  userController.updateProductInFridge
);
router.patch(
  '/me/fridge',
  isAuthenticated,
  validateReqData(userValidations.removeProductFromFridge),
  userController.removeProductFromFridge
);
export default router;
