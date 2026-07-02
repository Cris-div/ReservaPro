import { Request, Response } from "express";
import {
  actualizarServicio,
  crearServicio,
  eliminarServicio,
  listarServicios,
  obtenerServicio
} from "../services/servicio.service";
import { AppError } from "../utils/appError";
import { sendSuccess } from "../utils/response";

export const create = async (
  req: Request,
  res: Response
) => {
  const {
    nombre,
    descripcion,
    precio,
    duracion
  } = req.body;

  const servicio = await crearServicio(
    nombre,
    descripcion,
    precio,
    duracion
  );

  return sendSuccess(res, "Servicio creado correctamente", servicio, 201);
};

export const getAll = async (
  req: Request,
  res: Response
) => {
  const servicios = await listarServicios();

  return sendSuccess(res, "Servicios obtenidos correctamente", servicios);
};

export const getById = async (
  req: Request,
  res: Response
) => {
  const servicio = await obtenerServicio(
    Number(req.params.id)
  );

  if (!servicio) {
    throw new AppError("Servicio no encontrado", 404);
  }

  return sendSuccess(res, "Servicio obtenido correctamente", servicio);
};

export const update = async (
  req: Request,
  res: Response
) => {
  const servicio = await actualizarServicio(
    Number(req.params.id),
    req.body
  );

  return sendSuccess(res, "Servicio actualizado correctamente", servicio);
};

export const remove = async (
  req: Request,
  res: Response
) => {
  await eliminarServicio(
    Number(req.params.id)
  );

  return sendSuccess(res, "Servicio eliminado correctamente");
};
