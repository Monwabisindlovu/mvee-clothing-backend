import { Router } from 'express';
import upload from '../middleware/upload.middleware.js';
import { getAllProducts, getProductBySlug, getProductById, createProduct, updateProduct, deleteProduct, } from '../controllers/product.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
const router = Router();
router.get('/', getAllProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', protect, admin, getProductById);
router.post('/', protect, admin, upload.array('images', 5), createProduct);
router.put('/:id', protect, admin, upload.array('images', 5), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
export default router;
//# sourceMappingURL=product.routes.js.map