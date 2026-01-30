import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Seed admin only in non-production environments using lazy import
    if (process.env.NODE_ENV !== 'production') {
      try {
        const { seedAdmin } = await import('./config/seedAdmin.js');
        await seedAdmin();
      } catch (err) {
        console.warn('⚠️ seedAdmin.js not found or failed to run, skipping admin seeding');
      }
    }

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
