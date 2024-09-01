import { Request, Response } from "express";

import { IGetUserAuthInfoRequest } from "../../types/express";
import { productService } from "./service";

const { getProduct, getProducts, createProduct, deleteProduct, editProduct } =
  productService;

class ProductController {
  async createProduct(req: IGetUserAuthInfoRequest, res: Response) {
    const data = req.body;
    const user = req.user;
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const dataProduct = {
      user: {
        _id: user._id,
        username: user.username,
      },
      ...data,
    };
    try {
      const newProduct = await createProduct(dataProduct);
      return res
        .status(200)
        .json({ message: "Product create successfully", data: newProduct });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
  async deleteProduct(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const product = await deleteProduct(id);
      return res
        .status(200)
        .json({ message: "Product delete successfully", data: product });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
  async editProduct(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    try {
      const product = await editProduct(id, data);
      return res
        .status(200)
        .json({ message: "Product update successfully", data: product });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }

  async getProduct(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const product = await getProduct(id);
      return res.status(200).json({
        message: "The product was fetched successfully.",
        data: product,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }

  async getProducts(req: Request, res: Response) {
    const searchQuery = req.query;
    try {
      const products = await getProducts(searchQuery);
      return res
        .status(200)
        .json({ message: "Products was fetched successfully", data: products });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
}

export const productController = new ProductController();
