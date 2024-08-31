import { categoryController } from "./controller";
import express from "express";

const categoryRouter = express.Router();

const { createCategory, getCategorys } = categoryController;

categoryRouter.get("/", getCategorys); //--> para traer a todos los usuarios
// userRouter.get("/:id", getUser); //--> para traer a un usuario
categoryRouter.post("/addCategory", createCategory); //--> para registrar un usuario

// userRouter.delete("/deleteUser/:id", deleteUser); //--> para eliminar un usuario
// userRouter.put("/editUser/:id", updateUser); //--> para editar un usuario

export default categoryRouter;
