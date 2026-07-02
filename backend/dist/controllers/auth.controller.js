"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.perfil = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
const register = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const usuario = await (0, auth_service_1.registerUser)(nombre, correo, password);
    return (0, response_1.sendSuccess)(res, "Usuario registrado correctamente", usuario, 201);
};
exports.register = register;
const login = async (req, res) => {
    const { correo, password } = req.body;
    const data = await (0, auth_service_1.loginUser)(correo, password);
    return (0, response_1.sendSuccess)(res, "Login correcto", data);
};
exports.login = login;
const perfil = async (req, res) => {
    const usuario = await (0, auth_service_1.getPerfilUser)(req.usuario.id);
    return (0, response_1.sendSuccess)(res, "Perfil obtenido correctamente", usuario);
};
exports.perfil = perfil;
