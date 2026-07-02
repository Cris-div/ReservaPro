"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.myReservations = exports.getAll = exports.create = void 0;
const reserva_service_1 = require("../services/reserva.service");
const response_1 = require("../utils/response");
const create = async (req, res) => {
    const { fecha, servicioId } = req.body;
    const reserva = await (0, reserva_service_1.crearReserva)(fecha, req.usuario.id, servicioId);
    return (0, response_1.sendSuccess)(res, "Reserva creada correctamente", reserva, 201);
};
exports.create = create;
const getAll = async (req, res) => {
    const reservas = await (0, reserva_service_1.listarReservas)();
    return (0, response_1.sendSuccess)(res, "Reservas obtenidas correctamente", reservas);
};
exports.getAll = getAll;
const myReservations = async (req, res) => {
    const reservas = await (0, reserva_service_1.listarMisReservas)(req.usuario.id);
    return (0, response_1.sendSuccess)(res, "Mis reservas obtenidas correctamente", reservas);
};
exports.myReservations = myReservations;
const update = async (req, res) => {
    const reserva = await (0, reserva_service_1.actualizarReserva)(Number(req.params.id), req.body.estado);
    return (0, response_1.sendSuccess)(res, "Reserva actualizada correctamente", reserva);
};
exports.update = update;
const remove = async (req, res) => {
    await (0, reserva_service_1.eliminarReserva)(Number(req.params.id));
    return (0, response_1.sendSuccess)(res, "Reserva eliminada correctamente");
};
exports.remove = remove;
