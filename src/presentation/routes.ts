import { Router } from 'express';
import { ScrapingRoutes } from './scraping/routes';
export class AppRoutes {


    static get routes(): Router {
        const router = Router();

        // Define all api routes
        router.use(ScrapingRoutes.routes);

        return router;
    }

}