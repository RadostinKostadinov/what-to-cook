import httpStatus from 'http-status';

import catchAsync from '../utils/error_handler/catchAsync.js';
import unifiedResponse from '../utils/unifiedResponse.js';
import * as userService from '../services/user.service.js';

// Get logged in user info  =>  /api/user/me
export const getCurrentUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  return res.status(httpStatus.OK).json(unifiedResponse.success(httpStatus.OK, 'Current user data', user));
});

// Get logged in user fridge  =>  /api/user/me/fridge
export const getCurrentUserFridge = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  return res.status(httpStatus.OK).json(unifiedResponse.success(httpStatus.OK, 'Current user fridge', user.fridge));
});
