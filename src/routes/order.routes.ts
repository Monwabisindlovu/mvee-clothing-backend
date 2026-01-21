// src/routes/order.routes.ts
import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/order.controller';
import { authMiddleware, adminAuth } from '../middleware/auth.middleware';

const router = Router();

// Public
router.post('/', createOrder);

// Admin
router.use(authMiddleware, adminAuth);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);

export default router;
