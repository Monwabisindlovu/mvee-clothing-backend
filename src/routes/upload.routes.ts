import { Router } from 'express';
import upload from '../middleware/upload.middleware.js';
import { uploadImage, getSignature } from '../controllers/upload.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = Router();

// Backend‑handled image upload (your existing route)
router.post('/image', protect, adminMiddleware, upload.single('image'), uploadImage);

// New: Signed upload signature route
router.get('/signature', protect, adminMiddleware, getSignature);

export default router;
