import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary.js';

/**
 * Backend-handled upload: receives file via multer, uploads to Cloudinary
 */
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No image file provided',
      });
    }

    const base64 = req.file.buffer.toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'mvee/products',
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    return res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error: any) {
    console.error('Cloudinary upload failed:', error);

    return res.status(500).json({
      message: 'Image upload failed',
    });
  }
};

/**
 * Signature generator: frontend calls this to get signed params for direct upload
 */
export const getSignature = async (req: Request, res: Response) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Generate signature for folder "products"
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: 'products' },
    process.env.CLOUDINARY_API_SECRET!
  );

  res.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
};
