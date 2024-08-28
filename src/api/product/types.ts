type ProductStatus = "disponible"|"agotado"| "discontinuado";
type filterByPrice = "lower" | "higher";

export interface IProduct {
    _id: string | undefined;
    name: string;
    description: string;
    price: number;
    category: string; //--> mas adelante deberia ser una relacion con otro schema de category
    brand: string;
    stock: number;
    sku: string;
    images: string[]; 
    createdAt: Date;
    updatedAt: Date;
    status: ProductStatus;
    discount: number;
}


export interface ISearchParams {
  category?: string;
  brand?: string;
  salersId?: string;
  filterByPrice?: filterByPrice;
  priceRange?: string;
  page?: string;
  limit?: string;
}
