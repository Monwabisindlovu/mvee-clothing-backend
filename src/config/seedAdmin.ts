// src/config/seedAdmin.ts
import User from '../models/User.model';
import bcrypt from 'bcryptjs';

export const seedAdmin = async () => {
  try {
    const adminEmail = 'admin@example.com';
    const existing = await User.findOne({ email: adminEmail });

    if (!existing) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      await User.create({
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isAdmin: true,
      });

      console.log('✅ Admin user created: admin@example.com / admin123');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  } catch (err) {
    console.error('❌ Failed to seed admin user:', err);
  }
};
