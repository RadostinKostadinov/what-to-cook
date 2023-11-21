import httpStatus from 'http-status';

import ApiError from '../utils/error_handler/error_types/ApiError.js';
import * as userService from './user.service.js';
import Token from '../database/models/token.model.js';
import { tokensConfig } from '../config/index.js';

export const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(
      'LOGIN_WITH_EMAIL_AND_PASSWORD__FAILED',
      httpStatus.BAD_REQUEST,
      true,
      'Incorrect Email or Password',
      [
        {
          label: 'email',
          message: 'Incorrect email or password',
        },
        {
          label: 'password',
          message: 'Incorrect email or password',
        },
      ]
    );
  }

  return user;
};

export const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOneAndDelete({
    token: refreshToken,
    type: tokensConfig.tokenTypes.REFRESH,
    blacklisted: false,
  });

  if (!refreshTokenDoc) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: 'Invalid refresh token.',
    });
  }

  return refreshTokenDoc;
};
