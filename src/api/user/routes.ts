import express from "express";
import { userController } from "./controller";



const userRouter = express.Router();

const { createUser } =
  userController;

// userRouter.get("/", getUsers);
// userRouter.get("/:id", getUser);
// userRouter.post("/register", createUser);
// userRouter.post("/login", loginUser);
// userRouter.delete("/deleteUser/:id", deleteUser);
// userRouter.put("/editUser/:id", editUser);

userRouter.get("/"); //--> para traer a todos los usuarios
userRouter.get("/:id"); //--> para traer a un usuario 
userRouter.post("/register", createUser); //--> para registrar un usuario
userRouter.post("/login"); //--> para que un usuario se loguee
userRouter.delete("/deleteUser/:id"); //--> para eliminar un usuario
userRouter.put("/editUser/:id"); //--> para editar un usuario


export default userRouter;
