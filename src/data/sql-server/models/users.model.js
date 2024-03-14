import { DataTypes } from 'sequelize';
import { sequelize } from '../mssql-database.js';

export const Users = sequelize.define(
  'Users',
  {
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);
