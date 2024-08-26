import { User } from "./model";
import { IUser } from "./types";


class UserDao {
    async getUserBy(email: string) {
        try {
            const user = await User.findOne({ email });
            return user
        } catch (error) {
            throw Error((error as Error).message);
        }
    }

    async getUserByMail(email: string) {
        try {
            const user = await User.findOne({ email });
            return user
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async createUser(user: IUser) {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}
export const userDao = new UserDao();