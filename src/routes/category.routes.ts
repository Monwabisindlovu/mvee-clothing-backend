// src/routes/category.routes.ts
import { Router } from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

/* =========================
   PUBLIC ROUTES
========================= */

// Get all categories
router.get('/', getCategories);

// Get single category by ID
router.get('/:id', getCategoryById);

/* =========================
   ADMIN ROUTES
========================= */

// Protect everything below this line
router.use(protect, admin);

// Create category
router.post('/', createCategory);

// Update category
router.put('/:id', updateCategory);

// Delete category
router.delete('/:id', deleteCategory);

export default router;
