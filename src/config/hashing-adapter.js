import bcrypt from 'bcrypt';

export class HashingAdapter {
  static hash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  }
  static compare(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
