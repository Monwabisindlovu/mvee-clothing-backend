// src/routes/order.routes.ts
import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/order.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

/* ------------------------------ PUBLIC ROUTES ------------------------------ */

// Create a new order
router.post('/', createOrder);

/* ------------------------------ ADMIN ROUTES ------------------------------- */

// Protect all admin routes
router.use(protect, admin);

// Get all orders
router.get('/', getOrders);

// Get single order by ID
router.get('/:id', getOrderById);

// Update order status
router.patch('/:id/status', updateOrderStatus);

export default router;
