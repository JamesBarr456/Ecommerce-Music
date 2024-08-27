import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema, z } from "zod";

export const validateSchema =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return _res.status(400).json({
          message: "Validation failed",
          errors: errorMessages,
        });
      }
      return next(error);
    }
  };

export const registerSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  firts_name: z.string({ required_error: "Username is required" }),
  last_name: z.string({ required_error: "Username is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  confirm_password: z.string({
    required_error: "confirm_Password is required",
  }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
