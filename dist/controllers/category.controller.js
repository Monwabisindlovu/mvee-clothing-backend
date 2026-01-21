import Category from '../models/Category.model.js';
// Create category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existing = await Category.findOne({ name });
        if (existing)
            return res.status(400).json({ message: 'Category already exists' });
        const category = await Category.create({ name });
        res.status(201).json(category);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create category', error: err });
    }
};
// Get all categories
export const getCategories = async (_req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to get categories', error: err });
    }
};
