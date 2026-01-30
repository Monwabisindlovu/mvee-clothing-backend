// src/controllers/product.controller.ts
import { Request, Response } from 'express';
import Product from '../models/Product.model.js';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

/* ------------------------------ GET ALL PRODUCTS ----------------------------- */
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ created_at: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

/* ------------------------------ GET PRODUCT BY SLUG -------------------------- */
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

/* ------------------------------ GET PRODUCT BY ID (ADMIN) -------------------- */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

/* ------------------------------ CREATE PRODUCT (ADMIN) ----------------------- */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      category,
      subcategory,
      type,
      price,
      original_price,
      images,
      sizes,
      colors,
      in_stock,
      is_featured,
      is_on_promotion,
    } = req.body;

    // Generate slug + short UUID
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

/* ------------------------------ UPDATE PRODUCT (ADMIN) ----------------------- */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    updates.updated_at = new Date();

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

/* ------------------------------ DELETE PRODUCT (ADMIN) ----------------------- */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

/* ------------------------------ GET FEATURED PRODUCTS ------------------------ */
export const getFeaturedProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find({ is_featured: true }).sort({ created_at: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch featured products' });
  }
};

/* ------------------------------ GET PROMOTIONAL PRODUCTS -------------------- */
export const getPromotionalProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find({ is_on_promotion: true }).sort({ created_at: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch promotional products' });
  }
};
