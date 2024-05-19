import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', AuthController.login);

router.post('/register', AuthController.register);

router.post('/google', AuthController.googleSignIn);

export default router;
