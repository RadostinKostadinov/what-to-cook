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
  const user = await userService.createUser(req.validatedData.body);

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
      path: '/api',
    })
    .cookie('refreshToken', tokens.refresh.token, {
      expires: new Date(tokens.refresh.expires * 1000),
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh',
    })
    .cookie('refreshToken', tokens.refresh.token, {
      expires: new Date(tokens.refresh.expires * 1000),
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict',
      path: '/api/auth/logout',
    })
    .json(unifiedResponse.success(httpStatus.OK, 'Logged in.'));
});

// Refresh JWT tokens =>  /api/auth/refresh
export const refresh = catchAsync(async (req, res) => {
  const { cookies } = req;

  if (!cookies?.refreshToken) {
    throw new ApiError('REFRESH_TOKENS__TOKEN_NOT_FOUND', httpStatus.BAD_REQUEST, true, 'Token not found.');
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
      path: '/api',
    })
    .json(unifiedResponse.success(httpStatus.OK, 'Access token refreshed.'));
});

// Refresh JWT tokens =>  /api/auth/logout
export const logout = catchAsync(async (req, res) => {
  const { cookies } = req;

  if (!cookies?.refreshToken) {
    throw new ApiError('REFRESH_TOKENS__TOKEN_NOT_FOUND', httpStatus.BAD_REQUEST, true, 'Token not found.');
  }

  const { refreshToken } = cookies;

  await authService.logout(refreshToken);

  res
    .status(httpStatus.OK)
    .cookie('accessToken', 'TheCookieWasDeleted', {
      maxAge: 0,
      httpOnly: true,
      secure: config.env === 'production',
      path: '/api',
    })
    .cookie('refreshToken', 'TheCookieWasDeleted', {
      maxAge: 0,
      httpOnly: true,
      secure: config.env === 'production',
      path: '/api/auth/refresh',
    })
    .json(unifiedResponse.success(httpStatus.OK, 'Logged out.'));
});
