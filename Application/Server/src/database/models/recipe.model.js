import mongoose from 'mongoose';
import toJSON from '../plugins/toJSON.plugin.js';

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    preparationTime: {
      type: Number,
      required: true,
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    totalTime: {
      type: Number,
      required: true,
    },
    portions: {
      type: Number,
      required: true,
    },
    products: [
      {
        _id: { _id: 0 },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        amount: Number,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [],
      required: true,
    },
    group: {
      type: String,
      enum: [],
      required: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to json
recipeSchema.plugin(toJSON);

export default mongoose.model('Recipe', recipeSchema);
