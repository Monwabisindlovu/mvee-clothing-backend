import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { env } from '../config/env.js';
/**
 * Middleware to protect routes
 * Verifies JWT and attaches user to request
 */
export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, env.JWT_SECRET);
        if (!decoded.id) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token payload' });
        }
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.error('Auth middleware error:', err);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
/**
 * Middleware to allow only admin users
 * Use AFTER protect middleware
 */
export const admin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: Missing user' });
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next();
};
