// src/config/db.ts
import mongoose from 'mongoose';
import { env } from './env.js';
export const connectDB = async () => {
    if (!env.MONGO_URI) {
        console.error('❌ MONGO_URI is not defined in environment variables');
        process.exit(1);
    }
    try {
        await mongoose.connect(env.MONGO_URI, {
            // optional options for better compatibility
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected');
    }
    catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
};
