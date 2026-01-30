import Order from '../models/Order.model.js';
import { generateWhatsAppLink } from '../utils/whatsapp.js';
/* ------------------------------ CREATE NEW ORDER ---------------------------- */
export const createOrder = async (req, res) => {
    try {
        const { customer_name, phone, address, items, notes } = req.body;
        const order = await Order.create({
            customer_name,
            phone,
            address,
            items,
            notes,
            status: 'pending',
            created_at: new Date(),
        });
        const message = `New Order:
Name: ${customer_name}
Phone: ${phone}
Address: ${address}
Notes: ${notes || '-'}
Items:
${items.map((i) => `${i.name} x${i.quantity}`).join('\n')}`;
        const waLink = generateWhatsAppLink(process.env.ADMIN_PHONE || '', message);
        res.status(201).json({ order, whatsapp_link: waLink });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create order' });
    }
};
/* ------------------------------ GET ALL ORDERS (ADMIN) ---------------------- */
export const getOrders = async (_req, res) => {
    try {
        const orders = await Order.find().sort({ created_at: -1 });
        res.json(orders);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};
/* ------------------------------ GET ORDER BY ID (ADMIN) --------------------- */
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json(order);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch order' });
    }
};
/* ------------------------------ UPDATE ORDER STATUS (ADMIN) ----------------- */
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status, updated_at: new Date() }, { new: true });
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json(order);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update order status' });
    }
};
