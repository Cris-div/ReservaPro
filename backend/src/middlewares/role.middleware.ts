import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { AppError } from "../utils/appError";

export const verificarRol = (...roles: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.usuario) {
      return next(new AppError("No autorizado", 401));
    }

    if (!roles.includes(req.usuario.rol)) {
      return next(new AppError("Acceso denegado", 403));
    }

    next();
  };
};
