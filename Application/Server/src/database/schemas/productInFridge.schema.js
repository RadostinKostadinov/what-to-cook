import mongoose from 'mongoose';

export default new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    amount: Number,
    alertAmount: Number,
  },
  {
    timestamps: true,
  }
);
