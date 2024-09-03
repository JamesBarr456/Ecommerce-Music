import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { orderController } from "./controller";

const orderRouter = Router();
const { createorder } = orderController;
orderRouter.get("/");
orderRouter.post("/addOrder", authMiddleware, createorder);

export default orderRouter;
