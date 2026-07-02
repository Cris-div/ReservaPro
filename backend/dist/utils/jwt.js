"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarToken = (id, rol) => {
    return jsonwebtoken_1.default.sign({
        id,
        rol
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};
exports.generarToken = generarToken;
