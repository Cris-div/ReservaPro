"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        nombre: zod_1.z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
        correo: zod_1.z.string().trim().email("El correo no es valido"),
        password: zod_1.z.string().min(6, "La contrasena debe tener al menos 6 caracteres")
    })
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        correo: zod_1.z.string().trim().email("El correo no es valido"),
        password: zod_1.z.string().min(1, "La contrasena es requerida")
    })
});
