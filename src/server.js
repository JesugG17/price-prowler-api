import express from 'express';
import cors from 'cors';

import SearchRouter from './routes/search-products.routes.js';

export class Server {
  constructor() {
    this.app = express();
    this.paths = {
      search: '/api/search',
    };
    this.port = 3001;

    this.configureMiddlewares();
    this.setupRoutes();
  }

  setupRoutes() {
    this.app.use(this.paths.search, SearchRouter);
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
