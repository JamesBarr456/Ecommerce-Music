import { IUser } from "./types";
import { TOKEN_SECRET } from "../../config";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { userDao } from "./dao";

const { 
  createUser, 
  getUserByMail, 
  getUserAll,
  getUserById, 
  deleteUser, 
  updateUser 
} = userDao;
class UserService {
  async createUser(user: IUser ) {
    const { email } = user;

    const userFound = await getUserByMail(email);
    if (userFound) throw new Error("El usuario ya existe");

    try {
      const newUser = await createUser(user);
      return newUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async loginUser(user: IUser) {
    try {
      const { email, password } = user;

      const isValidEmailUser = await getUserByMail(email);
      if (!isValidEmailUser) throw new Error("invalid Email");

      const isValidPassword = await compare(
        password,
        isValidEmailUser.password!
      );
      if (!isValidPassword) throw new Error("Invalid  password");

      const token = sign(
        {
          userId: isValidEmailUser._id,
          email: isValidEmailUser.email,
          role: isValidEmailUser.role,
        },
        TOKEN_SECRET!,
        { expiresIn: "1h" }
      );
      return token;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getUsers () {
    try {
      const users = await getUserAll();
      return users;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getUser (id : string) {
    try {
      const user = await getUserById(id);
     
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async deleteUser (id : string) {
    try {
      const user = await deleteUser(id);
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async updateUser (id : string, updatedData: Partial<IUser> ) {
    try {
      if (updatedData.password) {
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);
      updatedData.password = hashedPassword; 
    }
      const user = await updateUser( id, updatedData );
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const userService = new UserService();
