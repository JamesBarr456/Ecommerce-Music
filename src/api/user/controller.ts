import { Request, Response } from "express";
import { userService } from "./service";


const { createUser } = userService
//Los controller solo se deben encargar del manejo de las peticiones de entrada y salida
class UserController { 
    async createUser(req: Request, res: Response){
        try {
            const user = await createUser(req.body)
            return res.status(200).json(user)
        } catch (error) {
            return res.status(404).json({ error: "Users not found" });
        }
    }
}






export const userController = new UserController();
