import { IProduct } from "./types";
import { Product } from "./model";

class ProductDao {
  async createProduct(data: IProduct) {
    try {
      const newProduct = await Product.create(data);
      return newProduct;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async deleteProduct(productId: string) {
    try {
      const product = await Product.findByIdAndDelete(productId);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async editProduct(productId: string, updatedData: IProduct) {
    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        { $set: updatedData },
        { new: true, runValidators: true }
      );
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getProductById(productId: string) {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getAllProducts(
    category: string | undefined,
    brand: string | undefined,
    page: number | string | undefined,
    salersId: string | undefined,
    sort: Record<string, 1 | -1> | undefined,
    status: string | undefined,
    priceMax: number | undefined,
    priceMin: number | undefined,
    limit: number
  ) {
    try {
      const skip = (Number(page) - 1) * Number(limit);
      const products = await Product.find({
        ...(status ? { status } : {}),
        ...(brand ? { brand } : {}),
        ...(category ? { category } : {}),
        ...(salersId ? { salersId } : {}),
        ...(priceMin && priceMax
          ? { price: { $gte: priceMin, $lte: priceMax } }
          : {}),
      })
        .sort(sort)
        .limit(limit + skip)
        .skip(skip);
      return products;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}
export const productDao = new ProductDao();
