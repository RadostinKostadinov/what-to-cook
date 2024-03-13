import httpStatus from 'http-status';

import catchAsync from '../utils/error_handler/catchAsync.js';
import unifiedResponse from '../utils/unifiedResponse.js';
import * as userService from '../services/user.service.js';

// Get logged in user info  =>  /api/user/me
export const getCurrentUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  return res.status(httpStatus.OK).json(unifiedResponse.success(httpStatus.OK, 'Current user data', user));
});

// Get logged in user's fridge  =>  /api/user/me/fridge
export const getCurrentUserFridge = catchAsync(async (req, res) => {
  const fridge = await userService.getUserFridge(req.user.id);
  return res.status(httpStatus.OK).json(unifiedResponse.success(httpStatus.OK, 'Current user fridge', fridge));
});

// Add product to the user's fridge  =>  /api/user/me/fridge
export const addProductToFridge = catchAsync(async (req, res) => {
  const { name, amount, alertAmount } = req.validatedData.body;
  await userService.addProductToFridge(req.user.id, name, amount, alertAmount);

  return res
    .status(httpStatus.OK)
    .json(unifiedResponse.success(httpStatus.OK, "Product added to the user's fridge", []));
});

// Update product in the user's fridge  =>  /api/user/me/fridge
export const updateProductInFridge = catchAsync(async (req, res) => {
  const { name, amount, alertAmount } = req.validatedData.body;
  await userService.updateProductInFridge(req.user.id, name, amount, alertAmount);

  return res.status(httpStatus.OK).json(unifiedResponse.success(httpStatus.OK, 'Product updated.', []));
});

// Update product in the user's fridge  =>  /api/user/me/fridge
export const removeProductFromFridge = catchAsync(async (req, res) => {
  const { name } = req.validatedData.body;
  await userService.removeProductFromFridge(req.user.id, name);

  return res.status(httpStatus.OK).json(unifiedResponse.success(httpStatus.OK, 'Product removed.', []));
});
