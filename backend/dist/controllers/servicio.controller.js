"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const servicio_service_1 = require("../services/servicio.service");
const appError_1 = require("../utils/appError");
const response_1 = require("../utils/response");
const create = async (req, res) => {
    const { nombre, descripcion, precio, duracion } = req.body;
    const servicio = await (0, servicio_service_1.crearServicio)(nombre, descripcion, precio, duracion);
    return (0, response_1.sendSuccess)(res, "Servicio creado correctamente", servicio, 201);
};
exports.create = create;
const getAll = async (req, res) => {
    const servicios = await (0, servicio_service_1.listarServicios)();
    return (0, response_1.sendSuccess)(res, "Servicios obtenidos correctamente", servicios);
};
exports.getAll = getAll;
const getById = async (req, res) => {
    const servicio = await (0, servicio_service_1.obtenerServicio)(Number(req.params.id));
    if (!servicio) {
        throw new appError_1.AppError("Servicio no encontrado", 404);
    }
    return (0, response_1.sendSuccess)(res, "Servicio obtenido correctamente", servicio);
};
exports.getById = getById;
const update = async (req, res) => {
    const servicio = await (0, servicio_service_1.actualizarServicio)(Number(req.params.id), req.body);
    return (0, response_1.sendSuccess)(res, "Servicio actualizado correctamente", servicio);
};
exports.update = update;
const remove = async (req, res) => {
    await (0, servicio_service_1.eliminarServicio)(Number(req.params.id));
    return (0, response_1.sendSuccess)(res, "Servicio eliminado correctamente");
};
exports.remove = remove;
