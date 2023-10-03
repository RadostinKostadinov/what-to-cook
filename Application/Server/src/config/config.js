import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import httpStatus from 'http-status';
import envVarsValidation from '../validations/index.js';
import ApiError from '../utils/error_handler/error_types/ApiError.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config({ path: path.join(dirname, '../../.env') });

// Validates environment variables
const { value: envVars, error } = envVarsValidation.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new ApiError(
    'INVALID_ENVIRONMENT_VARIABLES',
    httpStatus.INTERNAL_SERVER_ERROR,
    false,
    `Config validation error: ${error.message}`
  );
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  baseUrl: envVars.BASE_URL,
  clientUrl: envVars.CLIENT_URL,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {},
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};

export default config;
