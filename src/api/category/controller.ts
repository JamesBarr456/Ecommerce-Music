import { Request, Response } from "express";

import { categoryService } from "./service";

const { createCategory, getCategorys } = categoryService;
class CategoryController {
  async createCategory(req: Request, res: Response) {
    try {
      const category = await createCategory(req.body);
      return res.status(200).json(category);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return res.status(500).json({ error: errorMessage });
    }
  }

  async getCategorys(_req: Request, res: Response) {
    try {
      const categorys = await getCategorys();
      return res.status(200).json(categorys);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
}

export const categoryController = new CategoryController();
