import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";

export interface AuthRequest extends Request {
  usuario?: any;
}

export const verificarToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Token requerido", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError("Token requerido", 401);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    req.usuario = decoded;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    next(new AppError("Token invalido", 401));
  }
};
