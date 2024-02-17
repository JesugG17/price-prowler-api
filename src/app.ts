import { Server } from './presentation/server';
import { envs } from './config/env';
import { AppRoutes } from './presentation/routes';

const bootstrap = async() => {
    
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start();
}

(async() => {
    await bootstrap();
})();

