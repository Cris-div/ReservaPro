"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarReserva = exports.actualizarReserva = exports.listarMisReservas = exports.listarReservas = exports.crearReserva = void 0;
const database_1 = __importDefault(require("../config/database"));
const appError_1 = require("../utils/appError");
const usuarioSelect = {
    id: true,
    nombre: true,
    correo: true,
    rol: true
};
const obtenerReservaExistente = async (id) => {
    const reserva = await database_1.default.reserva.findUnique({
        where: {
            id
        }
    });
    if (!reserva) {
        throw new appError_1.AppError("Reserva no encontrada", 404);
    }
    return reserva;
};
const verificarServicioExistente = async (id) => {
    const servicio = await database_1.default.servicio.findUnique({
        where: {
            id
        }
    });
    if (!servicio) {
        throw new appError_1.AppError("Servicio no encontrado", 404);
    }
    if (!servicio.activo) {
        throw new appError_1.AppError("El servicio no esta disponible", 400);
    }
};
const verificarHorarioDisponible = async (fecha, servicioId) => {
    const reserva = await database_1.default.reserva.findFirst({
        where: {
            fecha,
            servicioId,
            estado: {
                not: "CANCELADA"
            }
        }
    });
    if (reserva) {
        throw new appError_1.AppError("El horario seleccionado ya esta reservado", 400);
    }
};
const crearReserva = async (fecha, usuarioId, servicioId) => {
    await verificarServicioExistente(servicioId);
    await verificarHorarioDisponible(fecha, servicioId);
    return await database_1.default.reserva.create({
        data: {
            fecha,
            usuarioId,
            servicioId
        },
        include: {
            usuario: {
                select: usuarioSelect
            },
            servicio: true
        }
    });
};
exports.crearReserva = crearReserva;
const listarReservas = async () => {
    return await database_1.default.reserva.findMany({
        include: {
            usuario: {
                select: usuarioSelect
            },
            servicio: true
        },
        orderBy: {
            id: "asc"
        }
    });
};
exports.listarReservas = listarReservas;
const listarMisReservas = async (usuarioId) => {
    return await database_1.default.reserva.findMany({
        where: {
            usuarioId
        },
        include: {
            servicio: true
        },
        orderBy: {
            fecha: "asc"
        }
    });
};
exports.listarMisReservas = listarMisReservas;
const actualizarReserva = async (id, estado) => {
    await obtenerReservaExistente(id);
    return await database_1.default.reserva.update({
        where: {
            id
        },
        data: {
            estado
        }
    });
};
exports.actualizarReserva = actualizarReserva;
const eliminarReserva = async (id) => {
    await obtenerReservaExistente(id);
    return await database_1.default.reserva.delete({
        where: {
            id
        }
    });
};
exports.eliminarReserva = eliminarReserva;
