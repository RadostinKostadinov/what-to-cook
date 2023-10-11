import httpStatus from 'http-status';

import catchAsync from '../utils/error_handler/catchAsync.js';
import unifiedResponse from '../utils/unifiedResponse.js';
import * as userService from '../services/user.service.js';
import * as authService from '../services/auth.service.js';
import * as tokenService from '../services/token.service.js';
import config from '../config/config.js';
import { ApiError } from '../utils/error_handler/index.js';
import { tokensConfig } from '../config/index.js';

// Register a new user  =>  /api/auth/register
export const registerUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.validatedData);

  const tokens = await tokenService.generateAuthTokens(user);

  return res
    .status(httpStatus.CREATED)
    .json(unifiedResponse.success(httpStatus.CREATED, 'Successfully registered!', { user, tokens }));
});

// Login user =>  /api/auth/login
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.validatedData.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);

  const tokens = await tokenService.generateAuthTokens(user);

  res
    .status(httpStatus.OK)
    .cookie('accessToken', tokens.access.token, {
      expires: new Date(tokens.access.expires * 1000),
      httpOnly: true,
      secure: config.env === 'production',
    })
    .cookie('refreshToken', tokens.refresh.token, {
      expires: new Date(tokens.refresh.expires * 1000),
      httpOnly: true,
      secure: config.env === 'production',
      path: '/api/auth/refresh',
    })
    .json(unifiedResponse.success(httpStatus.OK, 'Logged in.'));
});

// Refresh JWT tokens =>  /api/auth/refresh
export const refresh = catchAsync(async (req, res) => {
  const { cookies } = req;

  if (!cookies?.refreshToken) {
    throw new ApiError('REFRESH_TOKENS__UNAUTHORIZED', httpStatus.UNAUTHORIZED, true, 'Unauthorized.');
  }

  const { refreshToken } = cookies;

  const payload = await tokenService.verifyToken(refreshToken, tokensConfig.tokenTypes.REFRESH);

  const user = await userService.getUserById(payload.user.id);

  const tokens = await tokenService.generateAuthTokens(user, true);

  res
    .status(httpStatus.OK)
    .cookie('accessToken', tokens.access.token, {
      expires: new Date(tokens.access.expires * 1000),
      httpOnly: true,
      secure: config.env === 'production',
    })
    .json(unifiedResponse.success(httpStatus.OK, 'Access token refreshed.'));
});
