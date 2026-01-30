import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import bcrypt from 'bcryptjs';
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: 'Admin already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'admin',
        });
        res.status(201).json({
            message: 'Admin created successfully',
            admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create admin' });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, role: 'admin' });
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid credentials' });
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed' });
    }
};
export const me = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ message: 'Unauthorized' });
        if (req.user.role !== 'admin')
            return res.status(403).json({ message: 'Forbidden' });
        res.json({
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch admin info', error: err });
    }
};
//# sourceMappingURL=auth.controller.js.map