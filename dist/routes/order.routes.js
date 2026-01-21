import { Router } from 'express';
import { createOrder, getOrders, getOrderById, updateOrderStatus, } from '../controllers/order.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
const router = Router();
// User routes
router.post('/', authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, getOrders); // user's own orders
// Admin routes
router.get('/', authMiddleware, adminMiddleware, getOrders); // all orders
router.get('/:id', authMiddleware, adminMiddleware, getOrderById);
router.patch('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);
export default router;
