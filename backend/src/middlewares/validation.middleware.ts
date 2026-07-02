import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { AppError } from "../utils/appError";

type RequestParts = {
  body?: unknown;
  params?: any;
  query?: unknown;
};

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      }) as RequestParts;

      req.body = parsed.body ?? req.body;
      req.params = parsed.params ?? req.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => issue.message);
        return next(new AppError("Datos invalidos", 400, errors));
      }

      next(error);
    }
  };
};
