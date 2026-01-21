import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Import routes
import productRoutes from './routes/product.routes.js';
// Future: import authRoutes from './routes/auth.routes.js';
// Future: import orderRoutes from './routes/order.routes.js';
// Future: import reviewRoutes from './routes/review.routes.js';
dotenv.config();
const app = express();
// Middleware
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'MVEE Clothing API' });
});
// Mount routes
app.use('/api/products', productRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/reviews', reviewRoutes);
export default app;
