import { Request, Response } from "express";

import { userService } from "./service";

const { 
  createUser, 
  loginUser, 
  getUsers, 
  getUser, 
  deleteUser, 
  updateUser 
} = userService;

class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const user = await createUser(req.body);
      return res
      .status(200)
      .json(user);
    } catch (error) {
     const errorMessage =
        error instanceof Error 
          ? error.message 
          : "An unexpected error occurred";
      return res
      .status(500)
      .json({ error: errorMessage });
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
        error instanceof Error 
          ? error.message 
          : "An unexpected error occurred";

      return res
      .status(500)
      .json({ error: errorMessage });
    }
  }

  async getUsers( _req: Request, res: Response){
    try {
      const users = await getUsers();
      return res.status(200).json(users)
    } catch (error) {
        const errorMessage =
          error instanceof Error 
            ? error.message 
            : "An unexpected error occurred";

        return res
        .status(500)
        .json({ error: errorMessage });
    }
  }

  async getUser( req: Request, res: Response){
    const {id} = req.params
    try {
      const user = await getUser(id);
      return res.status(200).json(user)
    } catch (error) {
        const errorMessage =
          error instanceof Error 
            ? error.message 
            : "An unexpected error occurred";

        return res
        .status(500)
        .json({ error: errorMessage });
    }
  }
  async deleteUser( req: Request, res: Response){
    const {id} = req.params
    try {
      const user = await deleteUser(id);
      return res.status(200).json(user)
    } catch (error) {
        const errorMessage =
          error instanceof Error 
            ? error.message 
            : "An unexpected error occurred";

        return res
        .status(500)
        .json({ error: errorMessage });
    }
  }

  async updateUser( req: Request, res: Response){
    const {id} = req.params
    const { data } = req.body
    try {
      const user = await updateUser(id, data);
      return res.status(200).json(user)
    } catch (error) {
        const errorMessage =
          error instanceof Error 
            ? error.message 
            : "An unexpected error occurred";

        return res
        .status(500)
        .json({ error: errorMessage });
    }
  }
}
export const userController = new UserController();
