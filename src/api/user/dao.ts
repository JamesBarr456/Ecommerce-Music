import { IUser } from "./types";
import { User } from "./model";

class UserDao {
  async getUserAll () {
    try {
      const users = await User.find(); // 
      const sanitizedUsers = users.map(user => {
        const { password, ...rest } = user;
        return rest;
      });

      return sanitizedUsers;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async getUserById(userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
      throw new Error('User not found');
      } 
      const { password, ...rest } = user; ;
      return rest;
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
      throw Error((error as Error).message);
    }
  }
  async deleteUser(userId: string){
    try {
      const deletUser = await User.findByIdAndDelete(userId);
      return deletUser;
    } catch (error) {
       throw Error((error as Error).message);
    }
  }
  async updateUser(userId: string, updatedData: Partial<IUser>) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { $set: updatedData }, 
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
}
export const userDao = new UserDao();
