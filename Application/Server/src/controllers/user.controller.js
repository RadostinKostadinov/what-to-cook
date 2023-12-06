import httpStatus from 'http-status';

import catchAsync from '../utils/error_handler/catchAsync.js';
import unifiedResponse from '../utils/unifiedResponse.js';
import * as userService from '../services/user.service.js';

// Get logged in user info  =>  /api/user/me
export const getCurrentUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  console.log('here');
  return res.status(httpStatus.CREATED).json(unifiedResponse.success(httpStatus.CREATED, 'Current user data', user));
});
