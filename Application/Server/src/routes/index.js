import express from 'express';

import docsRoute from './swagger.route.js';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';

import { config } from '../config/index.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
];

// Routes that will be available only in development environment
const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// Development routes
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
