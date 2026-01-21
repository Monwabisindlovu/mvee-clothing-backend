import Order from '../models/Order.model.js';
// Create new order
export const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create order', error: err });
    }
};
// Get all orders
export const getOrders = async (_req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders', error: err });
    }
};
// Get single order
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order)
            return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch order', error: err });
    }
};
