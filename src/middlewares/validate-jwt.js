import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { HTTP_CODE } from '../utils/http-codes.js';

export const validateJWT = async (req, res, next) => {
  const { 'x-token': token } = req.headers;

  if (!token) {
    return res.status(HTTP_CODE.UNAUTHORIZED).json({
      data: null,
      message: 'You must provide token to the application',
      code: HTTP_CODE.UNAUTHORIZED,
    });
  }

  try {
    const { userId } = jwt.verify(token, ENV.SECRET_KEY);

    req.userId = userId;

    next();
  } catch (error) {
    return res.status(HTTP_CODE.UNAUTHORIZED).json({
      data: null,
      message: 'Invalid token',
      code: HTTP_CODE.UNAUTHORIZED,
    });
  }
};
