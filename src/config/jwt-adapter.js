import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

export class JwtAdapter {
  static sign(data) {
    return new Promise((resolve) => {
      jwt.sign(data, secretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          return resolve(err);
        }
        resolve(token);
      });
    });
  }

  static verify(token) {
    return new Promise((resolve) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return resolve(err);
        }
        return resolve(decoded);
      });
    });
  }
}
