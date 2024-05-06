import mongoose from 'mongoose';

export class MongoDatabase {
  static async connect() {
    try {
      await mongoose.connect('mongodb://localhost:27017');
      console.log('Database connection established');
    } catch (error) {
      console.log('Database connection not established');
    }
  }
}
