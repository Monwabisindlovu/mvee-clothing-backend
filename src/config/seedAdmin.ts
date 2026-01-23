// src/config/seedAdmin.ts
import User from '../models/User.model';
import bcrypt from 'bcryptjs';

export const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error('ADMIN_EMAIL or ADMIN_PASSWORD not set in environment variables');
    }

    const existing = await User.findOne({ email: adminEmail });

    if (!existing) {
      // No admin found → create new one
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await User.create({
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });

      console.log(`✅ Admin user created: ${adminEmail}`);
    } else {
      // Admin exists → check if password needs rotation
      const passwordMatches = await bcrypt.compare(adminPassword, existing.password);

      if (!passwordMatches) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        existing.password = hashedPassword;
        await existing.save();
        console.log(`🔄 Admin password updated for: ${adminEmail}`);
      } else {
        console.log('ℹ️ Admin user already exists with matching credentials');
      }
    }
  } catch (err) {
    console.error('❌ Failed to seed admin user:', err);
  }
};
