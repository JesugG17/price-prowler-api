import express from 'express';
import cors from 'cors';

import SearchRouter from './routes/search-products.routes.js';
import AuthRouter from './routes/auth.routes.js';
import AssetsRouter from './routes/assets.routes.js';
import TrackingRouter from './routes/tracking.routes.js';

export class Server {
  constructor() {
    this.app = express();
    this.paths = {
      search: '/api/search',
      auth: '/api/auth',
      assets: '/api/assets',
      tracking: '/api/tracking',
    };
    this.port = 3002;

    this.configureMiddlewares();
    this.setupRoutes();
  }

  setupRoutes() {
    this.app.use(this.paths.search, SearchRouter);
    this.app.use(this.paths.auth, AuthRouter);
    this.app.use(this.paths.assets, AssetsRouter);
    this.app.use(this.paths.tracking, TrackingRouter);
  }

  configureMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  startApp() {
    this.app.listen(this.port, () => {
      console.log(`Server running in port ${this.port}`);
    });
  }
}
