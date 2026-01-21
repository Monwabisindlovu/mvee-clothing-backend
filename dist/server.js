import mongoose from 'mongoose';
import { env } from './config/env.js';
import app from './app.js';
const PORT = env.PORT || 5000;
const MONGO_URI = env.MONGO_URI;
const startServer = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');
        // Start Express server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
};
startServer();
