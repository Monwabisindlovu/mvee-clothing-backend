import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// Routes
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import authRoutes from './routes/auth.routes';
import reviewRoutes from './routes/review.routes';
import categoryRoutes from './routes/category.routes';

// Middleware
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
========================= */

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

/* =========================
   HEALTH CHECK
========================= */

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'MVEE Clothing API',
    timestamp: new Date().toISOString(),
  });
});

/* =========================
   API ROUTES
========================= */

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

/* =========================
   ERROR HANDLER (MUST BE LAST)
========================= */

app.use(errorHandler);

export default app;
