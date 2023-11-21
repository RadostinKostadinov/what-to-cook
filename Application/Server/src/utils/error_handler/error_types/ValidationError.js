import httpStatus from 'http-status';
import BaseError from './BaseError.js';

export default class ValidationError extends BaseError {
  type;

  data;

  /**
   * ValidationError
   * @param {string} name - Custom error name
   * @param {string} httpCode
   * @param {boolean} isOperational - Is operational(true) or programmer(false) error
   * @param {description} description - Custom error description
   * @param {data} data - Validation errors
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
    this.type = 'VALIDATION_ERROR';
    this.data = data;
  }
}
