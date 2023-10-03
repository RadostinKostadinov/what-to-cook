import httpStatus from 'http-status';
import BaseError from './BaseError.js';

export default class ApiError extends BaseError {
  constructor(
    name,
    httpCode = httpStatus.INTERNAL_SERVER_ERROR,
    isOperational = true,
    description = httpStatus['500_MESSAGE']
  ) {
    super(name, httpCode, isOperational, description);
  }
}
