"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarRol = void 0;
const appError_1 = require("../utils/appError");
const verificarRol = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return next(new appError_1.AppError("No autorizado", 401));
        }
        if (!roles.includes(req.usuario.rol)) {
            return next(new appError_1.AppError("Acceso denegado", 403));
        }
        next();
    };
};
exports.verificarRol = verificarRol;
