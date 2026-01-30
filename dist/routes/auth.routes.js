import { Router } from 'express';
import { login, me, registerAdmin } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const router = Router();
router.post('/login', login);
router.post('/register-admin', registerAdmin);
router.get('/me', protect, me);
export default router;
//# sourceMappingURL=auth.routes.js.map