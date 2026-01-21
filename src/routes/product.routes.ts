import { Router } from 'express';
import upload from '../middleware/upload.middleware';
import {
  getAllProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { adminAuth } from '../middleware/auth.middleware';

const router = Router();

/* ------------------------------ PUBLIC ROUTES ------------------------------ */

// Get all products
router.get('/', getAllProducts);

// Get product by slug (for storefront)
router.get('/:slug', getProductBySlug);

// Optional: get product by ID (admin usage)
router.get('/id/:id', adminAuth, getProductById);

/* ------------------------------ ADMIN ROUTES ------------------------------- */

// Create product (with images)
router.post('/', adminAuth, upload.array('images', 5), createProduct);

// Update product
router.put('/:id', adminAuth, upload.array('images', 5), updateProduct);

// Delete product
router.delete('/:id', adminAuth, deleteProduct);

export default router;
