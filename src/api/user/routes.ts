import { loginSchema, registerSchema } from "./validate";

import express from "express";
import { userController } from "./controller";
import { validateSchema } from "./middleware";

const userRouter = express.Router();

const { registerUser, loginUser } = userController;

// userRouter.get("/", getUsers);
// userRouter.get("/:id", getUser);
// userRouter.delete("/deleteUser/:id", deleteUser);
// userRouter.put("/editUser/:id", editUser);

userRouter.get("/"); //--> para traer a todos los usuarios
userRouter.get("/:id"); //--> para traer a un usuario
userRouter.post("/register", validateSchema(registerSchema), registerUser); //--> para registrar un usuario
userRouter.post("/login", validateSchema(loginSchema), loginUser); //--> para que un usuario se loguee
userRouter.delete("/deleteUser/:id"); //--> para eliminar un usuario
userRouter.put("/editUser/:id"); //--> para editar un usuario

export default userRouter;
