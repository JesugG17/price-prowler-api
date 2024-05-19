import { HashingAdapter } from '../config/hashing-adapter.js';
import { JwtAdapter } from '../config/jwt-adapter.js';
import { Users } from '../data/mongo/models/users.model.js';
import { googleVerify } from '../utils/google-verify.js';
import { HTTP_CODE } from '../utils/http-codes.js';

export class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        message: 'Crendenciales invalidas',
        ok: false,
      });
    }

    const isValidPassword = HashingAdapter.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        message: 'Crendenciales invalidas',
        ok: false,
      });
    }

    const token = await JwtAdapter.sign({ userId: user._id });

    res.status(HTTP_CODE.OK).json({
      token,
      data: {
        name: user.name,
      },
      ok: true,
    });
  }

  static async register(req, res) {
    const { email, password, name } = req.body;

    const user = await Users.findOne({ email });

    if (user) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        message: 'User already exists',
        ok: false,
      });
    }

    const hashedPassword = HashingAdapter.hash(password);

    const newUser = new Users({ email, password: hashedPassword, name });
    await newUser.save();

    res.status(201).json({
      message: '¡Te has registrado exitosamente!',
      ok: true,
    });
  }

  static async googleSignIn(req, res) {
    const data = await googleVerify(req.body.code);

    console.log(data);
    if (!data.ok) {
      return res.status(400).json({
        ok: false,
        data: null,
        message: 'Google Sign In falló',
      });
    }

    let user = await Users.findOne({ email: data.email });

    if (!user) {
      user = new Users({ name: data.name, email: data.email, password: HashingAdapter.hash(':P') });
      await user.save();
    }

    const token = await JwtAdapter.sign({ userId: user._id });

    res.json({
      data: {
        user: {
          userName: user.name,
          email: user.email,
          photo: user.photourl,
        },
      },
      ok: true,
      token,
      message: '¡Inicio de sesion exitoso!',
    });
  }
}
