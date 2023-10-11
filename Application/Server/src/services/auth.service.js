import httpStatus from 'http-status';

import ApiError from '../utils/error_handler/error_types/ApiError.js';
import * as userService from './user.service.js';

export const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(
      'LOGIN_WITH_EMAIL_AND_PASSWORD__FAILED',
      httpStatus.UNAUTHORIZED,
      true,
      'Incorrect Email or Password'
    );
  }

  return user;
};
