import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { productController } from "./controller";

const { getProduct, getProducts, createProduct, deleteProduct, editProduct } =
  productController;
const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/addProduct", authMiddleware, createProduct);
productRouter.delete("/deleteProduct/:id", deleteProduct);
productRouter.put("/editProduct/:id", editProduct);

export default productRouter;
