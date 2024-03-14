import { Sequelize } from 'sequelize';

export class MssqlDatabase {
  static async connect(options) {
    const { dbName, dbUser, dbPassword } = options;

    try {
      const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
        host: 'localhost',
        dialect: 'mssql',
      });

      await sequelize.authenticate();
    } catch (error) {
      console.log('Error connecting to the database ');
      throw error;
    }
  }
}
