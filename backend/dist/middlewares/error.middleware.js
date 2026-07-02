"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const appError_1 = require("../utils/appError");
const response_1 = require("../utils/response");
const errorHandler = (error, req, res, next) => {
    if (error instanceof appError_1.AppError) {
        return (0, response_1.sendError)(res, error.message, error.errors, error.statusCode);
    }
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return (0, response_1.sendError)(res, "Recurso no encontrado", [], 404);
    }
    return (0, response_1.sendError)(res, "Error interno del servidor", [], 500);
};
exports.errorHandler = errorHandler;
