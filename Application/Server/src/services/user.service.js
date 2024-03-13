import httpStatus from 'http-status';
import mongoose from 'mongoose';
import User from '../database/models/user.model.js';
import ApiError from '../utils/error_handler/error_types/ApiError.js';
import DatabaseError from '../utils/error_handler/error_types/DatabaseError.js';
import { findProductByName } from './product.service.js';
import fridge from '../config/fridge.js';

export const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError('CREATE_USER__EMAIL_TAKEN', httpStatus.BAD_REQUEST, true, 'Email already taken', [
      { label: 'email', message: 'Email already taken' },
    ]);
  }

  try {
    return await User.create(userBody);
  } catch (error) {
    throw new DatabaseError(
      'CREATE_USER__INVALID_BODY',
      httpStatus.BAD_REQUEST,
      true,
      `The data sent to the database was invalid. - DB_RES: ${error.message}`
    );
  }
};

export const getUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(
      'GET_USER_BY_ID__INVALID_ID',
      httpStatus.BAD_REQUEST,
      true,
      'The user ID provided is invalid according to the mongoose.Types.ObjectID type.'
    );
  }
  return User.findById(new mongoose.Types.ObjectId(id));
};

export const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const getUserFridge = async (userId) => {
  const user = await User.findOne({ _id: userId }, { 'fridge.activity': { $slice: -10 } })
    .populate(['fridge.products.product', 'fridge.activity', 'fridge.activity.product'])
    .exec();

  if (!user || !user.fridge) {
    return null; // Return null if the user or fridge is not found or if fridge is empty
  }

  user.fridge.activity.sort((a, b) => {
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  return user.fridge;
};

export const getProductFromFridge = async (userId, productId) => {
  const user = (
    await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$fridge.products' },
      { $match: { 'fridge.products.product': new mongoose.Types.ObjectId(productId) } },
      { $project: { 'fridge.products': 1 } },
      {
        $lookup: {
          from: 'products',
          localField: 'fridge.products.product',
          foreignField: '_id',
          as: 'fridge.products.product',
        },
      },
      { $unwind: '$fridge.products.product' },
    ])
  )[0];

  if (!user || !user.fridge || user.fridge.length === 0) {
    return null; // Return null if the user or fridge is not found or if fridge is empty
  }

  return user.fridge.products;
};

export const addProductToFridge = async (userId, productName, amount, alertAmount) => {
  const product = await findProductByName(productName);
  // eslint-disable-next-line no-underscore-dangle
  const productInFridge = await getProductFromFridge(userId, product._id);
  if (productInFridge) {
    await User.updateOne(
      { _id: userId, 'fridge.products.product': product.id },
      {
        $set: {
          'fridge.products.$.amount': productInFridge.amount + amount,
          'fridge.products.$.alertAmount': alertAmount,
        },
        $push: {
          'fridge.activity': { product: product.id, actionType: fridge.actionTypes.add, amount },
        },
      }
    );
  } else {
    await User.updateOne(
      { _id: userId },
      // eslint-disable-next-line no-underscore-dangle
      {
        $push: {
          'fridge.products': { product: product.id, amount, alertAmount },
          'fridge.activity': { product: product.id, actionType: fridge.actionTypes.add, amount },
        },
      }
    );
  }
};

export const updateProductInFridge = async (userId, productName, amount, alertAmount) => {
  const product = await findProductByName(productName);
  const productInFridge = await getProductFromFridge(userId, product.id);
  if (productInFridge) {
    await User.updateOne(
      { _id: userId, 'fridge.products.product': product.id },
      {
        $set: { 'fridge.products.$.amount': amount, 'fridge.products.$.alertAmount': alertAmount },
        $push: {
          'fridge.activity': { product: product.id, actionType: fridge.actionTypes.edit, amount },
        },
      }
    );
  } else {
    throw new ApiError(
      'UPDATE_PRODUCT_IN_FRIDGE__PRODUCT_NOT_IN_THE_FRIDGE',
      httpStatus.BAD_REQUEST,
      true,
      "The product isn't in the fridge.",
      [{ label: 'root', message: "The product isn't in the fridge." }]
    );
  }
};

export const removeProductFromFridge = async (userId, productName) => {
  const product = await findProductByName(productName);
  const productInFridge = await getProductFromFridge(userId, product.id);
  if (productInFridge) {
    await User.updateOne(
      { _id: userId },
      {
        $pull: { 'fridge.products': { product: product.id } },
        $push: {
          'fridge.activity': {
            product: product.id,
            actionType: fridge.actionTypes.remove,
            amount: productInFridge.amount,
          },
        },
      }
    );
  } else {
    throw new ApiError(
      'REMOVE_PRODUCT_FROM_FRIDGE__PRODUCT_NOT_IN_THE_FRIDGE',
      httpStatus.BAD_REQUEST,
      true,
      "The product isn't in the fridge.",
      [{ label: 'root', message: "The product isn't in the fridge." }]
    );
  }
};
