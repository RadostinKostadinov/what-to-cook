/* eslint-disable no-param-reassign */
import httpStatus from 'http-status';
import Product from '../database/models/product.model.js';
import DatabaseError from '../utils/error_handler/error_types/DatabaseError.js';
import { ApiError } from '../utils/error_handler/index.js';

export const createProduct = async (productBody) => {
  if (await Product.doesProductExist(productBody.name)) {
    throw new ApiError('CREATE_PRODUCT__PRODUCT_EXISTS', httpStatus.BAD_REQUEST, true, 'Product already exists', [
      { label: 'name', message: 'Product already exists' },
    ]);
  }

  try {
    return await Product.create(productBody);
  } catch (error) {
    throw new DatabaseError(
      'CREATE_PRODUCT__INVALID_BODY',
      httpStatus.BAD_REQUEST,
      true,
      `The data sent to the database was invalid. - DB_RES: ${error.message}`
    );
  }
};

export const getAllProducts = async () => {
  try {
    return await Product.find({});
  } catch (error) {
    throw new DatabaseError(
      'GET_ALL_PRODUCTS_ERROR',
      httpStatus.BAD_REQUEST,
      true,
      `The data sent to the database was invalid. - DB_RES: ${error.message}`
    );
  }
};

export const findProductByName = async (name) => {
  try {
    return await Product.findOne({ name }).exec();
  } catch (error) {
    throw new DatabaseError(
      'FIND_PRODUCT_BY_NAME',
      httpStatus.BAD_REQUEST,
      true,
      `The data sent to the database was invalid. - DB_RES: ${error.message}`
    );
  }
};
