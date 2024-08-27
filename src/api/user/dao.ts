import { IUser } from "./types";
import { User } from "./model";

class UserDao {
  async getUserById(userId: string) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getUserByMail(email: string) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async createUser(user: IUser) {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      console.error("Error en createUser:", (error as Error).message);
      throw Error((error as Error).message);
    }
  }
}
export const userDao = new UserDao();
