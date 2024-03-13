import Joi from 'joi';
import httpStatus from 'http-status';
import selectProperties from '../utils/selectProperties.js';
import ValidationError from '../utils/error_handler/error_types/ValidationError.js';

export const validateReqData = (schema) => (req, res, next) => {
  // Gets validation schema for http request
  const validSchema = selectProperties(schema, ['params', 'query', 'body', 'file']);

  // Selects only params,query,body from the request object
  const object = selectProperties(req, Object.keys(validSchema));

  // Specific config for route [post]/user/, because of formdata request
  if (req.route.path === '/user/' && req.route.methods.post) {
    object.body.recipe = JSON.parse(object.body.recipe);
  }

  // Validating request's data
  const { value: validatedData, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errors = error.details.map((details) => {
      return {
        label: details.context.label,
        message: details.message,
      };
    });
    return next(
      new ValidationError(
        'REQUEST_DATA_VALIDATION_FAILED',
        httpStatus.BAD_REQUEST,
        true,
        'Request data validation failed.',
        errors
      )
    );
  }

  Object.assign(req, { validatedData });
  return next();
};
