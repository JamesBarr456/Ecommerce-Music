import { ICategory } from "./types";
import { categoryDao } from "./dao";

const { createCategory, getCategoryByName, getCategoryAll } = categoryDao;

class CategoryService {
  async createCategory(category: ICategory) {
    const { name } = category;

    const categoryFound = await getCategoryByName(name);
    if (categoryFound) throw new Error("Category already exist");

    try {
      const newCategory = await createCategory(category);
      return newCategory;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getCategorys() {
    try {
      const categorys = await getCategoryAll();
      return categorys;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const categoryService = new CategoryService();
