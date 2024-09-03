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
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  status: ProductStatus;
  discount: number;
  category: {
    _id: mongoose.Types.ObjectId;
    name: string;
  };
  user: {
    _id: mongoose.Types.ObjectId;
    username: string;
  };
}

export interface ISearchParams {
  category?: string;
  brand?: string;
  salersId?: string;
  sort_by?: SortBy;
  priceRange?: string;
  page?: string;
  status?: ProductStatus;
}
