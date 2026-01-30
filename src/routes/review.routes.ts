// src/routes/review.routes.ts
import { Router } from 'express';
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/review.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = Router();

/* ------------------------------ PUBLIC ROUTES ------------------------------ */

// Get all reviews
router.get('/', getReviews);

// Get a single review by ID
router.get('/:id', getReviewById);

/* ------------------------------ AUTHENTICATED ROUTES ----------------------- */

// Create a review (any logged-in user)
router.post('/', protect, createReview);

/* ------------------------------ ADMIN ROUTES -------------------------------- */

// Update review
router.patch('/:id', protect, admin, updateReview);

// Delete review
router.delete('/:id', protect, admin, deleteReview);

export default router;
