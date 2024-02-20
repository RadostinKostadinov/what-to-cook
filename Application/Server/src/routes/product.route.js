import express from 'express';

import { validateReqData } from '../middlewares/validateReqData.js';
import * as productController from '../controllers/product.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import * as productValidations from '../validations/product.validation.js';

const router = express.Router();

router.post('/', isAuthenticated, validateReqData(productValidations.createProduct), productController.createProduct);

export default router;
