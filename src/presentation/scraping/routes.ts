import { Router } from 'express';
import { ScrapingController } from './controller';
export class ScrapingRoutes {



    static get routes(): Router {
        const router = Router();

        const scrapingController = new ScrapingController();

        router.get('/product/:productName', scrapingController.getProducts)

        return router;
    }


}