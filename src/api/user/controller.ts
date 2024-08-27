import { Request, Response } from "express";

import { userService } from "./service";

const { createUser, loginUser } = userService;
//Los controller solo se deben encargar del manejo de las peticiones de entrada y salida
class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const user = await createUser(req.body);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "No se pudo crear,paso algo" });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const token = await loginUser(req.body);
      return res
        .header("authtoken", token)
        .status(200)
        .json("Login successful");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
}

export const userController = new UserController();
