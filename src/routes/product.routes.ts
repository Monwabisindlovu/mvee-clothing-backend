// src/routes/product.routes.ts
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
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

/* ------------------------------ PUBLIC ROUTES ------------------------------ */

// Get all products
router.get('/', getAllProducts);

// Get product by slug (for storefront)
router.get('/slug/:slug', getProductBySlug);

/* ------------------------------ ADMIN ROUTES ------------------------------- */

// Get product by ID (admin)
router.get('/:id', protect, admin, getProductById);

// Create product (with images)
router.post('/', protect, admin, upload.array('images', 5), createProduct);

// Update product
router.put('/:id', protect, admin, upload.array('images', 5), updateProduct);

// Delete product
router.delete('/:id', protect, admin, deleteProduct);

export default router;
