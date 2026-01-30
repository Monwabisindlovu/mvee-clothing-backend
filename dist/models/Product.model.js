import { Schema, model } from 'mongoose';
const productImageSchema = new Schema({
    id: { type: String, required: true },
    url: { type: String, required: true },
    alt: { type: String },
}, { _id: false });
const productColorSchema = new Schema({
    name: { type: String, required: true },
    hex: { type: String, required: true },
}, { _id: false });
const productSchema = new Schema({
    // ✅ Updated type field
    type: {
        type: String,
        required: true,
        trim: true,
    },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    short_description: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    original_price: { type: Number, default: null },
    images: { type: [productImageSchema], default: [] },
    sizes: { type: [String], default: [] },
    colors: { type: [productColorSchema], default: [] },
    category: { type: String, required: true },
    subcategory: { type: String },
    stock: { type: Number, default: 0 },
    in_stock: { type: Boolean, default: true },
    is_featured: { type: Boolean, default: false },
    is_on_promotion: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, { timestamps: true });
export default model('Product', productSchema);
