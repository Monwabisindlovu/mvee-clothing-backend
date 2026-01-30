// src/config/env.ts
import dotenv from 'dotenv';
dotenv.config();
const requiredEnvVars = [
    'MONGO_URI',
    'JWT_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    // 'WHATSAPP_PHONE_ID',
    // 'WHATSAPP_TOKEN',
];
// Validate required env vars
requiredEnvVars.forEach(key => {
    if (!process.env[key]) {
        throw new Error(`❌ Missing required environment variable: ${key}`);
    }
});
export const env = {
    PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    // WHATSAPP_PHONE_ID: process.env.WHATSAPP_PHONE_ID!,
    // WHATSAPP_TOKEN: process.env.WHATSAPP_TOKEN!,
};
