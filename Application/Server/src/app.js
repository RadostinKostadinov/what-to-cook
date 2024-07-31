import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import { errorConverter, errorHandler } from './middlewares/error.js';
import { ApiError } from './utils/error_handler/index.js';

import routes from './routes/index.js';

const app = express();

// Set security HTTP headers
app.use(helmet());

// Set cookie parser
app.use(cookieParser());

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Sanitize request data
app.use(mongoSanitize());

// Add GZIP compression
app.use(compression());

// Cors options

const allowedOrigins = ['http://localhost:3000', 'http://192.168.7.4:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  // origin: true,

  credentials: true,
};

app.use(cors(corsOptions));

// Api routes
app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError('INVALID_ROUTE', httpStatus.NOT_FOUND));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
