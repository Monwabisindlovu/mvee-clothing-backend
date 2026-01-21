import Product from '../models/Product.model.js';
import slugify from 'slugify';
// ESM-compatible UUID import for ts-node in CommonJS
import pkg from 'uuid';
const { v4: uuidv4 } = pkg;
/* ------------------------------ GET ALL PRODUCTS ----------------------------- */
export const getProducts = async (_req, res) => {
    try {
        const products = await Product.find().sort({ created_at: -1 });
        res.json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};
/* ------------------------------ GET SINGLE PRODUCT --------------------------- */
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
/* ------------------------------ CREATE PRODUCT ------------------------------- */
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
        });
        res.status(201).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create product' });
    }
};
/* ------------------------------ UPDATE PRODUCT ------------------------------- */
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
/* ------------------------------ DELETE PRODUCT ------------------------------- */
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
