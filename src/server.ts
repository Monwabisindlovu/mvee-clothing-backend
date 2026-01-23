// src/server.ts
import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';
import { seedAdmin } from './config/seedAdmin';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Ensure admin exists on startup
    await seedAdmin();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
