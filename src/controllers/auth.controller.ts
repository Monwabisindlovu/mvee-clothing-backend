// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import User, { IUser } from '../models/User.model';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import bcrypt from 'bcryptjs';

// Extending Request type for TS
interface AuthRequest extends Request {
  user?: IUser;
}

/**
 * Admin login only
 * POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Only admins can login
    const user = await User.findOne({ email, role: 'admin' });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    if (!env.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};

/**
 * Get current admin info
 * GET /api/auth/me
 */
export const me = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    // Only allow admins
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch admin info', error: err });
  }
};
