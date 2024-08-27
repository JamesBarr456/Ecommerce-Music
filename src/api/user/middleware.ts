import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

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
