import categoryRouter from "../api/category/routes";
import express from "express";
import productRouter from "../api/product/routes";
import userRouter from "../api/user/routes";

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categorys", categoryRouter);
export default router;
