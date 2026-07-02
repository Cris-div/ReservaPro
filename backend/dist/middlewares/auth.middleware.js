"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../utils/appError");
const verificarToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new appError_1.AppError("Token requerido", 401);
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new appError_1.AppError("Token requerido", 401);
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    }
    catch (error) {
        if (error instanceof appError_1.AppError) {
            return next(error);
        }
        next(new appError_1.AppError("Token invalido", 401));
    }
};
exports.verificarToken = verificarToken;
