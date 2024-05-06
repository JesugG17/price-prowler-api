import { HashingAdapter } from '../config/hashing-adapter.js';
import { JwtAdapter } from '../config/jwt-adapter.js';
import { Users } from '../data/mongo/models/users.model.js';

export class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    const isValidPassword = HashingAdapter.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Crendenciales invalidas',
        ok: false,
      });
    }

    const token = await JwtAdapter.sign({ userId: user._id });
    console.log(token);

    res.status(200).json({
      token,
      ok: true,
    });
  }

  static async register(req, res) {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: 'User already exists',
        ok: false,
      });
    }

    const hashedPassword = HashingAdapter.hash(password);

    const newUser = new Users({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      ok: true,
    });
  }
}
