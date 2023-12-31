import httpStatus from 'http-status';
import BaseError from './BaseError.js';

export default class ApiError extends BaseError {
  type;

  data;

  /**
   * ApiError
   * @param {string} name - Custom error name
   * @param {string} httpCode
   * @param {boolean} isOperational - Is operational(true) or programmer(false) error
   * @param {description} description - Custom error description
   * @returns {Error}
   */
  constructor(
    name,
    httpCode = httpStatus.INTERNAL_SERVER_ERROR,
    isOperational = true,
    description = httpStatus[httpCode],
    data = []
  ) {
    super(name, httpCode, isOperational, description);
    this.type = 'API_ERROR';
    this.data = data;
  }
}
