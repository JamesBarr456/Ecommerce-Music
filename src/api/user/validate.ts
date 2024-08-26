import {z} from "zod"

export const registerSchema = z.object({
    firs_name: z.string({ required_error: "Username is required" }),
    lastn_name: z.string({ required_error: "Username is required" }),
    username: z.string({ required_error: "Username is required" }),
    email: z.string( { required_error: "Email is required"} ).email({message: "Invalid email"}),
    password: z.string( { required_error: "Password is required"}).min(6, { message: "Password must be at least 6 characters"}),
    avatar: z.string().optional(),
})

export const loginSchema = z.object({
      email: z.string( { required_error: "Email is required"} ).email({message: "Invalid email"}),
       password: z.string( { required_error: "Password is required"}).min(6, { message: "Password must be at least 6 characters"})
})

