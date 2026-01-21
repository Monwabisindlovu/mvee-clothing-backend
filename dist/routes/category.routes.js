import { Router } from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory, } from '../controllers/category.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
const router = Router();
// Public
router.get('/', getCategories);
router.get('/:id', getCategoryById);
// Admin only
router.post('/', authMiddleware, adminMiddleware, createCategory);
router.patch('/:id', authMiddleware, adminMiddleware, updateCategory);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategory);
export default router;
