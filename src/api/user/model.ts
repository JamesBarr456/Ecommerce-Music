import { Schema, model } from "mongoose";

import { IUser } from "./types";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>({
  firts_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "vendedor", "comprador"],
    default: "comprador",
  },
  avatar: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  //--> Esto es un middleware de mongoose, antes que se cree o actualice un usuario va a tener que encriptar la contraseña.
  try {
    const hashedPassword = await bcrypt.hash(this.password ?? "", 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});

export const User = model<IUser>("User", userSchema);
