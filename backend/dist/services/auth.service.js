"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPerfilUser = exports.loginUser = exports.registerUser = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const appError_1 = require("../utils/appError");
const usuarioSelect = {
    id: true,
    nombre: true,
    correo: true,
    rol: true
};
const registerUser = async (nombre, correo, password) => {
    const existe = await database_1.default.usuario.findUnique({
        where: {
            correo
        }
    });
    if (existe) {
        throw new appError_1.AppError("El correo ya esta registrado", 400);
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    return await database_1.default.usuario.create({
        data: {
            nombre,
            correo,
            password: passwordHash
        },
        select: usuarioSelect
    });
};
exports.registerUser = registerUser;
const loginUser = async (correo, password) => {
    const usuario = await database_1.default.usuario.findUnique({
        where: {
            correo
        }
    });
    if (!usuario) {
        throw new appError_1.AppError("Correo o contrasena incorrectos", 401);
    }
    const coincide = await bcryptjs_1.default.compare(password, usuario.password);
    if (!coincide) {
        throw new appError_1.AppError("Correo o contrasena incorrectos", 401);
    }
    const token = (0, jwt_1.generarToken)(usuario.id, usuario.rol);
    return {
        token,
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        }
    };
};
exports.loginUser = loginUser;
const getPerfilUser = async (id) => {
    const usuario = await database_1.default.usuario.findUnique({
        where: {
            id
        },
        select: usuarioSelect
    });
    if (!usuario) {
        throw new appError_1.AppError("Usuario no encontrado", 404);
    }
    return usuario;
};
exports.getPerfilUser = getPerfilUser;
