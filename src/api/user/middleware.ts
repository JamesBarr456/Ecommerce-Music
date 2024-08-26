import { NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body)
        next()
        
    } catch (error) {
        console.log(error)
    }
}