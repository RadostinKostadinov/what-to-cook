/* eslint-disable no-underscore-dangle */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import docsRoute from './swagger.route.js';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';
import productRoute from './product.route.js';
import recipeRoute from './recipe.route.js';

import { config } from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/recipe',
    route: recipeRoute,
  },
];

// Route for public images
router.use(
  '/images',
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  },
  express.static(path.resolve(__dirname, '../../public/images'))
);

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
