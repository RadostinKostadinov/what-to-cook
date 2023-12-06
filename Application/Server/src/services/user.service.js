import httpStatus from 'http-status';
import mongoose from 'mongoose';
import User from '../database/models/user.model.js';
import ApiError from '../utils/error_handler/error_types/ApiError.js';
import DatabaseError from '../utils/error_handler/error_types/DatabaseError.js';

export const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError('CREATE_USER__EMAIL_TAKEN', httpStatus.BAD_REQUEST, true, 'Email already taken', [
      { label: 'email', message: 'Email already taken' },
    ]);
  }

  try {
    return await User.create(userBody);
  } catch (error) {
    throw new DatabaseError(
      'CREATE_USER__INVALID_BODY',
      httpStatus.BAD_REQUEST,
      true,
      `The data sent to the database was invalid. - DB_RES: ${error.message}`
    );
  }
};

export const getUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(
      'GET_USER_BY_ID__INVALID_ID',
      httpStatus.BAD_REQUEST,
      true,
      'The user ID provided is invalid according to the mongoose.Types.ObjectID type.'
    );
  }
  return User.findById(new mongoose.Types.ObjectId(id));
};

export const getUserByEmail = async (email) => {
  return User.findOne({ email });
};
