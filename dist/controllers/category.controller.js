import Category from '../models/Category.model.js';
/* ------------------------------ GET ALL CATEGORIES --------------------------- */
export const getCategories = async (_req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get categories' });
    }
};
/* ------------------------------ GET CATEGORY BY ID --------------------------- */
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        res.json(category);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch category' });
    }
};
/* ------------------------------ CREATE CATEGORY (ADMIN) ---------------------- */
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existing = await Category.findOne({ name });
        if (existing) {
            res.status(400).json({ message: 'Category already exists' });
            return;
        }
        const category = await Category.create({ name });
        res.status(201).json(category);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create category' });
    }
};
/* ------------------------------ UPDATE CATEGORY (ADMIN) ---------------------- */
export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        res.json(category);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update category' });
    }
};
/* ------------------------------ DELETE CATEGORY (ADMIN) ---------------------- */
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        res.json({ message: 'Category deleted' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete category' });
    }
};
