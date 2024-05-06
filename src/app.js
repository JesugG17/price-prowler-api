import { MongoDatabase } from './data/mongo/mongo-database.js';
import { Server } from './server.js';

const main = async () => {
  // await sequelize.authenticate();
  await MongoDatabase.connect();
  new Server().startApp();
};

main();
