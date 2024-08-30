import mongoose from "mongoose";

export type ProductStatus = "disponible" | "agotado" | "discontinuado";
export type SortBy =
  | "price_ascending"
  | "price_descending"
  | "alpha_ascending"
  | "alpha_descending"
  | "created_descending"
  | "created_ascending";

export interface IProduct {
  _id: string | undefined;
  name: string;
  description: string;
  price: number;
  brand: string;
  stock: number;
  sku: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  status: ProductStatus;
  discount: number;
  category: mongoose.Types.ObjectId;
}

export interface ISearchParams {
  category?: string;
  brand?: string; //---> deberia ser tambien otro Schema
  salersId?: string;
  sort_by?: SortBy;
  priceRange?: string;
  page?: string;
  status?: ProductStatus;
}
