import { IProduct, ISearchParams } from "./types";

import { Category } from "../category/model";
import { getSortObject } from "../../helpers/sorting";
import { productDao } from "./dao";

const {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
} = productDao;

class ProductService {
  async createProduct(data: IProduct) {
    const category = await Category.findOne({ name: data.category });

    if (!category) {
      throw new Error("Category not found");
    }
    const productData = {
      ...data,
      category: {
        _id: category._id,
        name: category.name as string,
      },
    };

    try {
      const newProduct = await createProduct(productData);
      return newProduct;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async deleteProduct(id: string) {
    try {
      const product = await deleteProduct(id);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async editProduct(id: string, data: IProduct) {
    try {
      const product = await editProduct(id, data);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getProduct(id: string) {
    try {
      const product = await getProductById(id);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getProducts(searchParams: ISearchParams) {
    const {
      brand,
      category,
      page = 1,
      priceRange,
      salersId,
      sort_by,
      status = "disponible",
    } = searchParams;

    const limit = 10;
    let priceMax: number | undefined;
    let priceMin: number | undefined;
    let sort = sort_by ? getSortObject(sort_by) : {};

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      priceMin = min;
      priceMax = max;
    }

    try {
      const products = await getAllProducts(
        category,
        brand,
        page,
        salersId,
        sort,
        status,
        priceMax,
        priceMin,
        limit
      );

      return products;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const productService = new ProductService();
