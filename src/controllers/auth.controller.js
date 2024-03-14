import bcrypt from 'bcrypt';
import { Users } from '../data/sql-server/models/users.model.js';

export class AuthController {
  static async login(req, res) {}

  static async register(req, res) {
    const { mail, password } = req.body;

    const user = await Users.findByPk(mail);

    if (user) {
      return res.status(400).json({
        message: 'User already exists',
        data: null,
        ok: false,
      });
    }

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

    await Users.create({ mail, password: hashedPassword });

    res.status(201).json({
      message: 'User registered successfully',
      ok: true,
    });
  }
}
