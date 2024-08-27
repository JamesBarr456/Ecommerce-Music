
import express from "express";
import { userController } from "./controller";
import { loginSchema, registerSchema, validateSchema } from "./middleware";

const userRouter = express.Router();

const { 
    registerUser, 
    loginUser, 
    getUsers, 
    getUser,
    deleteUser,
    updateUser
 } = userController;

userRouter.get("/", getUsers); //--> para traer a todos los usuarios
userRouter.get("/:id", getUser); //--> para traer a un usuario
userRouter.post("/register", validateSchema(registerSchema), registerUser); //--> para registrar un usuario
userRouter.post("/login", validateSchema(loginSchema), loginUser); //--> para que un usuario se loguee
userRouter.delete("/deleteUser/:id", deleteUser); //--> para eliminar un usuario
userRouter.put("/editUser/:id", updateUser); //--> para editar un usuario

export default userRouter;
