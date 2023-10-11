import Joi from 'joi';
import httpStatus from 'http-status';
import selectProperties from '../utils/selectProperties.js';
import ApiError from '../utils/error_handler/error_types/ApiError.js';

export const validateReqData = (schema) => (req, res, next) => {
  // Gets validation schema for http request
  const validSchema = selectProperties(schema, ['params', 'query', 'body']);

  // Selects only params,query,body from the request object
  const object = selectProperties(req, Object.keys(validSchema));

  // Validating request's data
  const { value: validatedData, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError('REQUEST_DATA_VALIDATION_FAILED', httpStatus.BAD_REQUEST, true, errorMessage));
  }

  Object.assign(req, { validatedData });
  return next();
};
