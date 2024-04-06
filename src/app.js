import { sequelize } from './data/sql-server/mssql-database.js';
import { Server } from './server.js';

export let instance;

const main = async () => {
  // await sequelize.authenticate();

  new Server().startApp();
};

main();
