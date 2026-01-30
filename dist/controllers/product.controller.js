import Product from '../models/Product.model.js';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
export const getAllProducts = async (_req, res) => {
    try {
        const products = await Product.find().sort({ created_at: -1 });
        res.json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};
export const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch product' });
    }
};
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch product' });
    }
};
export const createProduct = async (req, res) => {
    try {
        const { name, description, category, subcategory, type, price, original_price, images, sizes, colors, in_stock, is_featured, is_on_promotion, } = req.body;
        const slug = slugify(name, { lower: true, strict: true }) + '-' + uuidv4().slice(0, 6);
        const product = await Product.create({
            type: type || 'product',
            name,
            slug,
            description,
            category,
            subcategory,
            price,
            original_price: original_price || null,
            images: images || [],
            sizes: sizes || [],
            colors: colors || [],
            in_stock: in_stock ?? true,
            is_featured: is_featured ?? false,
            is_on_promotion: is_on_promotion ?? false,
            stock: sizes?.length || 0,
            created_at: new Date(),
        });
        res.status(201).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create product' });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const updates = req.body;
        updates.updated_at = new Date();
        const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update product' });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};
export const getFeaturedProducts = async (_req, res) => {
    try {
        const products = await Product.find({ is_featured: true }).sort({ created_at: -1 });
        res.json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch featured products' });
    }
};
export const getPromotionalProducts = async (_req, res) => {
    try {
        const products = await Product.find({ is_on_promotion: true }).sort({ created_at: -1 });
        res.json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch promotional products' });
    }
};
//# sourceMappingURL=product.controller.js.map