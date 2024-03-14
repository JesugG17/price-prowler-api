import { ENV } from './config/env.js';
import { MssqlDatabase } from './data/sql-server/mssql-database.js';
import { Server } from './server.js';

const main = async () => {
  await MssqlDatabase.connect({
    dbName: ENV.DATABASE_NAME,
    dbUser: ENV.DATABASE_USER,
    dbPassword: ENV.DATABASE_PASSWORD,
  });
};

main();
new Server().startApp();
