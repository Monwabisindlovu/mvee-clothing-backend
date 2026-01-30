import { Router } from 'express';
import upload from '../middleware/upload.middleware';
import { uploadImage, getSignature } from '../controllers/upload.controller';
import { protect } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const router = Router();

// Backend‑handled image upload (your existing route)
router.post('/image', protect, adminMiddleware, upload.single('image'), uploadImage);

// New: Signed upload signature route
router.get('/signature', protect, adminMiddleware, getSignature);

export default router;
