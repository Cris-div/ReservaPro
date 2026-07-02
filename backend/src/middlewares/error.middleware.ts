import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/appError";
import { sendError } from "../utils/response";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return sendError(res, error.message, error.errors, error.statusCode);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
    return sendError(res, "Recurso no encontrado", [], 404);
  }

  return sendError(res, "Error interno del servidor", [], 500);
};
