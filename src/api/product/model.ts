import mongoose, { Schema, model } from "mongoose";

import { IProduct } from "./types";

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  images: {
    type: [String], // Array de URLs de imágenes
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["disponible", "agotado", "discontinuado"],
    default: "disponible",
  },
  discount: {
    type: Number,
    default: 0,
  },
});

export const Product = model<IProduct>("Product", productSchema);
