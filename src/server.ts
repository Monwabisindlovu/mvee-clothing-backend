// src/server.ts
import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';
import { seedAdmin } from './config/seedAdmin';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Seed admin on startup
    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
