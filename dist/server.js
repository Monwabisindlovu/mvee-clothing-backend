import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import { seedAdmin } from './config/seedAdmin.js';
dotenv.config();
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log('✅ Connected to MongoDB');
        // Seed admin only in non-production environments
        if (process.env.NODE_ENV !== 'production') {
            await seedAdmin();
        }
        // Start Express server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
