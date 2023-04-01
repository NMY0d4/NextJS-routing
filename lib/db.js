import { MongoClient } from 'mongodb';
require('dotenv').config();

export async function connectDatabase() {
  return await MongoClient.connect(process.env.MONGO_DB_URL);
}
