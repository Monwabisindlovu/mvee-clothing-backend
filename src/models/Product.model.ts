import { Schema, model, Document } from 'mongoose';

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface IProduct extends Document {
  type: string;
  name: string;
  slug: string;
  description?: string;

  price: number;
  original_price?: number | null;

  images: ProductImage[];
  sizes: string[];
  colors: ProductColor[];

  category: string;
  subcategory?: string;

  stock: number;
  in_stock: boolean;

  is_featured: boolean;
  is_on_promotion: boolean;

  created_at: Date;
  updated_at: Date;
}

const productImageSchema = new Schema<ProductImage>(
  {
    id: { type: String, required: true },
    url: { type: String, required: true },
    alt: { type: String },
  },
  { _id: false }
);

const productColorSchema = new Schema<ProductColor>(
  {
    name: { type: String, required: true },
    hex: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new Schema<IProduct>(
  {
    // ✅ Updated type field
    type: {
      type: String,
      required: true,
      trim: true,
    },

    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
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
  },
  { timestamps: true }
);

export default model<IProduct>('Product', productSchema);
