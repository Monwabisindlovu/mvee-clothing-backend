import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.model';

dotenv.config(); // load .env file

const run = async () => {
  const uri = process.env.MONGO_URI; // <-- use MONGO_URI, not DB_URI
  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  await mongoose.connect(uri);

  // Delete all users with role 'admin'
  await User.deleteMany({ role: 'admin' });
  console.log('All admin records removed.');

  await mongoose.disconnect();
};

run().catch(err => console.error(err));
