
import { productDao } from "./dao";
import { IProduct, ISearchParams } from "./types";

const {
    // getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
} = productDao

class ProductService {
    
    async  createProduct (data : IProduct) {
        try {
            const newProduct = await createProduct(data);
            return newProduct
        } catch (error) {
           throw Error((error as Error).message);
        }
    }

    async  deleteProduct (id: string) {
        try {
            const product = await deleteProduct(id);
            return product
        } catch (error) {
           throw Error((error as Error).message);
        }
    }

    async  editProduct (id: string, data: IProduct) {
        try {
            const product = await editProduct(id, data)
            return  product
        } catch (error) {
           throw Error((error as Error).message);
        }
    }

    async  getProduct (id: string)  {
        try {
            const product = await getProductById(id)
            return product
        } catch (error) {
           throw Error((error as Error).message);
        }
    }

    async  getProducts (searchParams : ISearchParams) {
        const {} = searchParams
        try {
            return 
        } catch (error) {
           throw Error((error as Error).message);
        }
    }


}

export const productService = new ProductService();
