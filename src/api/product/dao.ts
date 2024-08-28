import { Product } from "./model";
import { IProduct } from "./types";

class ProductDao {
    async createProduct (data: IProduct) {
        try {
            const newProduct = await Product.create(data);
            return newProduct;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }

    async deleteProduct (productId: string) {
        try {
            const product = await Product.findByIdAndDelete(productId);
            return product
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    
    async editProduct (productId: string , updatedData : IProduct) {
        try {
            const product = await Product.findByIdAndUpdate(productId, 
                { $set: updatedData },
                {   new: true, 
                    runValidators: true 
                });
            return product
        } catch (error) {
            throw Error((error as Error).message);
        }
    }

    async getProductById (productId: string) {
        try {
            const product = await Product.findById(productId)
            return product
        } catch (error) {
            throw Error((error as Error).message);
        }
    }

    async getAllProducts () {
        try {
            return
        } catch (error) {
            throw Error((error as Error).message);
        }
    }



   

    

}
export const productDao = new ProductDao();
