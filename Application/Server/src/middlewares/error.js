import { Error as mongooseError } from 'mongoose';
import httpStatus from 'http-status';
import { config, logger } from '../config/index.js';
import BaseError from '../utils/error_handler/error_types/BaseError.js';
import ApiError from '../utils/error_handler/error_types/ApiError.js';

/**
 * Converts any error to an instance of ApiError if it is not already a BaseError.
 *
 * @param {Error} err - The error object to be converted.
 * @param {Object} req - The express request object.
 * @param {Object} res - The express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
export const errorConverter = (err, req, res, next) => {
  let error = err;
  // Check if the error is not an instance of BaseError
  if (!(error instanceof BaseError)) {
    // Determine the status code based on the error type or default to internal server error
    const statusCode =
      error.statusCode || error instanceof mongooseError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    // Get the error message or use the default message for the status code
    const message = error.message || httpStatus[statusCode];
    // Create a new ApiError instance
    error = new ApiError(statusCode, message, false, err.stack);
  }
  // Pass the error to the next middleware
  next(error);
};

/**
 * Error handler middleware.
 *
 * @param {Error} err - The error object passed to the middleware.
 * @param {Object} req - The express request object.
 * @param {Object} res - The express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let { httpCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    httpCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];

    logger.error(`[${err.type}], ${err.name}, ${err.httpCode}`, { stack: err.stack });
    // TODO: Send email to admin
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: httpCode,
    message,
    data: err.data || [],
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(`[${err.type}][${err.httpCode}], ${err.name} - ${err.message} `, { stack: err.stack });
  }
  res.status(httpCode).send(response);
};
