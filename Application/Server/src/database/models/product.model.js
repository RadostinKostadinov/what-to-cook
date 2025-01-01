import mongoose from 'mongoose';
import toJSON from '../plugins/toJSON.plugin.js';
import { productsConfig } from '../../config/index.js';

export const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    measurementUnit: {
      type: String,
      // enum: Object.values(productsConfig.productMeasurementUnits),
      required: true,
    },
  },
  {
    statics: {
      /**
       * Check if product already exist
       * @param {string} name - The product name
       * @returns {Promise<boolean>}
       */
      async doesProductExist(name) {
        const product = await this.findOne({ name });
        return !!product;
      },
    },
  }
);

// Add plugin that converts mongoose to json
productSchema.plugin(toJSON);

export default mongoose.model('Product', productSchema);
