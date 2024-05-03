import bcrypt from 'bcrypt';
import { Users } from '../data/sql-server/models/users.model.js';
import { HashingAdapter } from '../config/hashing-adapter.js';

export class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    const user = await Users.findByPk(email);

    const isValidPassword = HashingAdapter.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Crendenciales invalidas',
        ok: false,
      });
    }
  }

  static async register(req, res) {
    const { email, password } = req.body;

    const user = await Users.findByPk(email);

    if (user) {
      return res.status(400).json({
        message: 'User already exists',
        ok: false,
      });
    }

    const hashedPassword = HashingAdapter.hash(password);

    await Users.create({ email, password: hashedPassword });

    res.status(201).json({
      message: 'User registered successfully',
      ok: true,
    });
  }
}
