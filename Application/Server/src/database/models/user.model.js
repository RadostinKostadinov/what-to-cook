import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import productInFridge from '../schemas/productInFridge.schema.js';
import actionInFridge from '../schemas/actionInFridge.schema.js';
import toJSON from '../plugins/toJSON.plugin.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      private: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    fridge: {
      type: {
        _id: { _id: false },
        products: [productInFridge],
        activity: [actionInFridge],
      },
      default: {},
    },
    ownRecipes: {
      type: [],
      default: [],
    },
    recentlyCooked: {
      type: [],
      default: [],
    },
    favoriteRecipes: {
      type: [],
      default: [],
    },
    friends: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
  },
  {
    timestamps: true,
    methods: {
      /**
       * Check if password matches the user's password
       * @param {string} password
       * @returns {Promise<boolean>}
       */
      async isPasswordMatch(password) {
        const user = await User.findOne({ email: this.email }, { password: 1 }).exec();
        return bcrypt.compare(password, user.password);
      },
    },
    statics: {
      /**
       * Check if email is taken
       * @param {string} email - The user's email
       * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
       * @returns {Promise<boolean>}
       */
      async isEmailTaken(email, excludeUserId) {
        const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
        return !!user;
      },
    },
  }
);

// Add plugin that converts mongoose to json
userSchema.plugin(toJSON);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

export default User;
