import { NextFunction, Request, Response } from "express";

import { TOKEN_SECRET } from "../../config";
import jwt from "jsonwebtoken";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401).json("No es un usuario logueado");
    return;
  }

  jwt.verify(token, TOKEN_SECRET!, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return; // Asegura que la función termina aquí
    }

    req.user = user as any; // Guarda la información del vendedor en la request
    next(); // Continúa con el siguiente middleware
    return; // Opcional pero asegura que la función cumple con la expectativa de TypeScript
  });
}
