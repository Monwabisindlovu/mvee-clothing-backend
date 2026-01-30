import { Router } from 'express';
import { getReviews, getReviewById, createReview, updateReview, deleteReview, } from '../controllers/review.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
const router = Router();
router.get('/', getReviews);
router.get('/:id', getReviewById);
router.post('/', protect, createReview);
router.patch('/:id', protect, admin, updateReview);
router.delete('/:id', protect, admin, deleteReview);
export default router;
//# sourceMappingURL=review.routes.js.map