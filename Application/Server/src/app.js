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
const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: true,
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
