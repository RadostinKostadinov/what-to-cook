import moment from 'moment';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

import { config, tokensConfig } from '../config/index.js';
import Token from '../database/models/token.model.js';
import DatabaseError from '../utils/error_handler/error_types/DatabaseError.js';
import { ApiError } from '../utils/error_handler/index.js';

export const generateToken = (user, expires, type, secret = config.jwt.secret) => {
  const payload = {
    user: { id: user.id },
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  try {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });

    return tokenDoc;
  } catch (error) {
    throw new DatabaseError(
      'SAVE_TOKEN__INVALID_DATA',
      httpStatus.BAD_REQUEST,
      true,
      `The data sent to the database was invalid. - DB_RES: ${error.message}`
    );
  }
};

export const generateAuthTokens = async (user, accessOnly = false) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user, accessTokenExpires, tokensConfig.tokenTypes.ACCESS);

  if (accessOnly) {
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.unix(),
      },
    };
  }

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user, refreshTokenExpires, tokensConfig.tokenTypes.REFRESH);

  await saveToken(refreshToken, user.id, refreshTokenExpires, tokensConfig.tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.unix(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.unix(),
    },
  };
};

export const verifyToken = async (token, type, withoutDatabase = false) => {
  let payload;
  try {
    payload = jwt.verify(token, config.jwt.secret);
  } catch (err) {
    throw new ApiError('VERIFY_TOKEN__INVALID_TOKEN', httpStatus.UNAUTHORIZED, true, 'Invalid token.');
  }

  if (withoutDatabase) {
    return payload;
  }

  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.user.id,
    blacklisted: false,
  }).exec();

  if (!tokenDoc) {
    throw new DatabaseError(
      'VERIFY_TOKEN__INVALID_TOKEN_DATA',
      httpStatus.BAD_REQUEST,
      true,
      'The data, stored in token, are invalid.'
    );
  }

  return payload;
};
