import { Router } from 'express';
import { AssetsController } from '../controllers/assets.controller.js';

const router = Router();

router.get('/:id', AssetsController.getAsset);

export default router;
