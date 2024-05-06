import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export class JwtAdapter {
  static sign(data) {
    return new Promise((resolve) => {
      jwt.sign(data, ENV.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          return resolve(err);
        }
        resolve(token);
      });
    });
  }

  static verify(token) {
    return new Promise((resolve) => {
      jwt.verify(token, ENV.SECRET_KEY, (err, decoded) => {
        if (err) {
          return resolve(err);
        }
        return resolve(decoded);
      });
    });
  }
}
