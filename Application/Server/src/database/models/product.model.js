import mongoose from 'mongoose';
import toJSON from '../plugins/toJSON.plugin.js';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  measurementUnit: {
    type: String,
    enum: [],
    required: true,
  },
});

// Add plugin that converts mongoose to json
productSchema.plugin(toJSON);

export default mongoose.model('Product', productSchema);
