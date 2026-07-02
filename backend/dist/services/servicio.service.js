"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarServicio = exports.actualizarServicio = exports.obtenerServicio = exports.listarServicios = exports.crearServicio = void 0;
const database_1 = __importDefault(require("../config/database"));
const appError_1 = require("../utils/appError");
const obtenerServicioExistente = async (id) => {
    const servicio = await database_1.default.servicio.findUnique({
        where: {
            id
        }
    });
    if (!servicio) {
        throw new appError_1.AppError("Servicio no encontrado", 404);
    }
    return servicio;
};
const crearServicio = async (nombre, descripcion, precio, duracion) => {
    return await database_1.default.servicio.create({
        data: {
            nombre,
            descripcion,
            precio,
            duracion
        }
    });
};
exports.crearServicio = crearServicio;
const listarServicios = async () => {
    return await database_1.default.servicio.findMany({
        orderBy: {
            id: "asc"
        }
    });
};
exports.listarServicios = listarServicios;
const obtenerServicio = async (id) => {
    return await database_1.default.servicio.findUnique({
        where: {
            id
        }
    });
};
exports.obtenerServicio = obtenerServicio;
const actualizarServicio = async (id, data) => {
    await obtenerServicioExistente(id);
    return await database_1.default.servicio.update({
        where: {
            id
        },
        data
    });
};
exports.actualizarServicio = actualizarServicio;
const eliminarServicio = async (id) => {
    await obtenerServicioExistente(id);
    return await database_1.default.servicio.delete({
        where: {
            id
        }
    });
};
exports.eliminarServicio = eliminarServicio;
