import { Router } from 'express';
import { createOrder, getOrders, getOrderById, updateOrderStatus, } from '../controllers/order.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
const router = Router();
router.post('/', createOrder);
router.use(protect, admin);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);
export default router;
//# sourceMappingURL=order.routes.js.map