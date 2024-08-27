import { IUser } from "./types";
import { TOKEN_SECRET } from "../../config";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { userDao } from "./dao";

const { createUser, getUserByMail } = userDao;
class UserService {
  async createUser(user: IUser & { confirm_password: string }) {
    const { confirm_password, password, email, ...rest } = user;

    if (password !== confirm_password)
      throw new Error("Las contraseñas no coinciden");

    const userFound = await getUserByMail(email);
    if (userFound) throw new Error("El usuario ya existe");

    const userWithoutConfirmPassword = { ...rest, password, email };

    try {
      const newUser = await createUser(userWithoutConfirmPassword);
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
}

export const userService = new UserService();
