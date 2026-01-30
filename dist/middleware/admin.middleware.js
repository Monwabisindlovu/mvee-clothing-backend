export const adminMiddleware = (req, res, next) => {
    // Check role instead of isAdmin
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next();
};
