import { Router } from 'express';
import upload from '../middleware/upload.middleware.js';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, } from '../controllers/product.controller.js';
import { adminAuth } from '../middleware/auth.middleware.js';
const router = Router();
router.get('/', getProducts);
router.get('/:id', getProductById);
// Admin only routes with image upload
router.post('/', adminAuth, upload.array('images', 5), createProduct);
router.patch('/:id', adminAuth, upload.array('images', 5), updateProduct);
router.delete('/:id', adminAuth, deleteProduct);
export default router;
