import { Router } from 'express';
import { login, me } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

/* ------------------------------ AUTH ROUTES ------------------------------ */

// Admin login
router.post('/login', login);

// Get logged-in admin info
router.get('/me', authMiddleware, me);

export default router;
