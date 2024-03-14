import { Sequelize } from 'sequelize';
import { ENV } from '../../config/env.js';

const dbName = ENV.DATABASE_NAME;
const dbUser = ENV.DATABASE_USER;
const dbPassword = ENV.DATABASE_PASSWORD;

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: 'localhost',
  dialect: 'mssql',
});
