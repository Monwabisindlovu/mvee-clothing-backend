// src/config/cloudinary.ts
import { v2 as cloudinary, ConfigOptions } from 'cloudinary';
import { env } from './env.js';

// Validate required environment variables
if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
  throw new Error(
    '❌ Cloudinary environment variables are missing. Please check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
  );
}

const config: ConfigOptions = {
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
};

cloudinary.config(config);

export default cloudinary;
