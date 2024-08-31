import { Category } from "./model";
import { ICategory } from "./types";

class CategoryDao {
  async getCategoryAll() {
    try {
      const categorys = await Category.find(); //
      return categorys;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getCategoryByName(name: string) {
    try {
      const category = await Category.findOne({ name });
      return category;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async createCategory(category: ICategory) {
    try {
      const newCategory = await Category.create(category);
      return newCategory;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}
export const categoryDao = new CategoryDao();
