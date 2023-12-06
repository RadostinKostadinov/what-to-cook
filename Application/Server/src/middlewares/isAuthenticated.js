import httpStatus from 'http-status';
import ApiError from '../utils/error_handler/error_types/ApiError.js';
import * as tokenService from '../services/token.service.js';
import catchAsync from '../utils/error_handler/catchAsync.js';

export const isAuthenticated = catchAsync(async (req, res, next) => {
  const { cookies } = req;

  if (!cookies?.accessToken) {
    throw new ApiError('IS_AUTHENTICATED__ACCESS_TOKEN_NOT_FOUND', httpStatus.UNAUTHORIZED, true, 'Token not found.');
  }

  const { accessToken } = cookies;

  const payload = await tokenService.verifyToken(accessToken, null, true);

  Object.assign(req, { user: payload.user });
  next();
});
