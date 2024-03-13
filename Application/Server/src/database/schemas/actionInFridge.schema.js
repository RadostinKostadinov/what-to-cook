import mongoose from 'mongoose';
import { fridge } from '../../config/index.js';

export default new mongoose.Schema(
  {
    _id: { _id: false },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    actionType: {
      type: String,
      enum: Object.keys(fridge.actionTypes),
    },
    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
