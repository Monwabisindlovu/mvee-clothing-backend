import { Router } from 'express';
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/review.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const router = Router();

// Public routes
router.get('/', getReviews);
router.get('/:id', getReviewById);

// Authenticated users
router.post('/', authMiddleware, createReview);

// Admin routes
router.patch('/:id', authMiddleware, adminMiddleware, updateReview);
router.delete('/:id', authMiddleware, adminMiddleware, deleteReview);

export default router;
