import express, { Application, Router } from 'express';

interface Options {
    port?: number;
    routes: Router;
}

export class Server {

    private readonly app: Application;
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port = 3001, routes } = options;
        this.app = express();
        this.port = port;
        this.routes = routes;
    }

    async start() {
        this.configureMiddlewares();
        this.setRoutes();

        this.app.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`);
        })
    }

    private configureMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private setRoutes() {
        this.app.use(this.routes);
    }
}