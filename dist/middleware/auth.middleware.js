import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { env } from '../config/env.js';
// Auth middleware: validates JWT and attaches user to request
export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        req.user = user; // attach user to request for later use
        next();
    }
    catch (err) {
        console.error('Auth middleware error:', err);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
// Admin middleware: checks if authenticated user is admin
export const adminAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: Missing user' });
    }
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next();
};
