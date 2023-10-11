import { Error as mongooseError } from 'mongoose';
import httpStatus from 'http-status';
import { config, logger } from '../config/index.js';
import BaseError from '../utils/error_handler/error_types/BaseError.js';
import ApiError from '../utils/error_handler/error_types/ApiError.js';

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof BaseError)) {
    const statusCode =
      error.statusCode || error instanceof mongooseError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

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
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(`[${err.type}][${err.httpCode}], ${err.name} - ${err.message} `, { stack: err.stack });
  }
  res.status(httpCode).send(response);
};
