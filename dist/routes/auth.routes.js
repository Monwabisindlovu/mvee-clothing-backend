import { Router } from 'express';
import { registerUser, loginUser, getMe, updateProfile } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = Router();
// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
// Protected routes
router.get('/me', authMiddleware, getMe);
router.patch('/me', authMiddleware, updateProfile);
export default router;
