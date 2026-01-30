import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import authRoutes from './routes/auth.routes.js';
import reviewRoutes from './routes/review.routes.js';
import categoryRoutes from './routes/category.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'MVEE Clothing API',
        timestamp: new Date().toISOString(),
    });
});
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/upload', uploadRoutes);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map