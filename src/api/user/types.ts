type UserRole = "admin" | "vendedor" | "comprador";
export interface IUser {
  _id: string | undefined;
  firts_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}
