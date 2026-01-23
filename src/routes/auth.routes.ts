// src/routes/auth.routes.ts
import { Router } from 'express';
import { login, me, registerAdmin } from '../controllers/auth.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

/* ------------------------------ AUTH ROUTES ------------------------------ */

// Admin login
router.post('/login', login);

// Register a new admin (temporary)
router.post('/register-admin', registerAdmin);

// Get logged-in admin info
router.get('/me', protect, me); // <-- updated

export default router;
