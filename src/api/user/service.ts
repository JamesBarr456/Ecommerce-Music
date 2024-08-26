import { IUser } from "./types";
import { userDao } from "./dao";

const { createUser, getUserByMail } = userDao
class UserService {
    async createUser(user: IUser){
        const userFound = await getUserByMail(user.email);
        if( !userFound ) throw new Error('El usuario ya existe');
        
        try {
            const newUser = await createUser(user)
            return newUser
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
}

export const userService = new UserService();