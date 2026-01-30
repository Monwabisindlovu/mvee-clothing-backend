import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
dotenv.config();
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await connectDB();
        console.log('✅ Connected to MongoDB');
        if (process.env.NODE_ENV !== 'production') {
            try {
                const { seedAdmin } = await import('./config/seedAdmin.js');
                await seedAdmin();
            }
            catch (err) {
                console.warn('⚠️ seedAdmin.js not found or failed to run, skipping admin seeding');
            }
        }
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
//# sourceMappingURL=server.js.map