export default class BaseError extends Error {
  name;

  type;

  httpCode;

  isOperational;

  constructor(name, httpCode, isOperational, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.type = 'BASE_ERROR';
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
