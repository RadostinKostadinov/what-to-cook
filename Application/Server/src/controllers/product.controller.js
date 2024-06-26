import httpStatus from 'http-status';

import catchAsync from '../utils/error_handler/catchAsync.js';
import unifiedResponse from '../utils/unifiedResponse.js';
import * as productService from '../services/product.service.js';

// Create new product  =>  /api/product/
export const createProduct = catchAsync(async (req, res) => {
  await productService.createProduct(req.validatedData.body);

  return res.status(httpStatus.CREATED).json(unifiedResponse.success(httpStatus.CREATED, 'Product created!', {}));
});

// Get all products  =>  /api/product/
export const getAllProducts = catchAsync(async (req, res) => {
  const allProducts = await productService.getAllProducts();

  return res
    .status(httpStatus.OK)
    .json(unifiedResponse.success(httpStatus.OK, 'All products', { products: allProducts }));
});
