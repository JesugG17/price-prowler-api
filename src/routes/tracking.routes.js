import { Router } from 'express';
import { TrackingController } from '../controllers/tracking.controller.js';
import { validateJWT } from '../middlewares/validate-jwt.js';

const router = Router();

router.get('/get-by-user', [validateJWT], TrackingController.getByUser);

router.post('/add', [validateJWT], TrackingController.addProduct);

router.delete('/remove/:id', [validateJWT], TrackingController.removeProduct);

export default router;
