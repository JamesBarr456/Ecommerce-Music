import { NextFunction, Response } from "express";

import { IGetUserAuthInfoRequest } from "../../types/express";
import { TOKEN_SECRET } from "../../config";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  username: string;
}

export const authMiddleware = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!TOKEN_SECRET) {
    return res
      .status(500)
      .json({ message: "Internal server error: Missing token secret" });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET) as JwtPayload;
    req.user = {
      _id: decoded.userId,
      username: decoded.username,
    };
    return next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
