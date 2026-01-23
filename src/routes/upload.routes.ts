import { Router } from 'express';
import upload from '../middleware/upload.middleware';
import { uploadImage } from '../controllers/upload.controller';
import { protect } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const router = Router();

// Single image upload route
router.post('/image', protect, adminMiddleware, upload.single('image'), uploadImage);

export default router;
