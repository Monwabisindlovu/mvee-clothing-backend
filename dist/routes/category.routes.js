import { Router } from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory, } from '../controllers/category.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
const router = Router();
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.use(protect, admin);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
export default router;
//# sourceMappingURL=category.routes.js.map