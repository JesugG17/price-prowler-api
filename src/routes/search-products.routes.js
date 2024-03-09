import { Router } from 'express';
import { SearchController } from '../controllers/search-products.controller.js';

const router = Router();

router.get('/products/:productName', SearchController.getProductsFromWeb);

export default router;
