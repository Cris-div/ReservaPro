import { Response } from "express";
import {
  actualizarReserva,
  crearReserva,
  eliminarReserva,
  listarMisReservas,
  listarReservas
} from "../services/reserva.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { sendSuccess } from "../utils/response";

export const create = async (
  req: AuthRequest,
  res: Response
) => {
  const { fecha, servicioId } = req.body;

  const reserva = await crearReserva(
    fecha,
    req.usuario.id,
    servicioId
  );

  return sendSuccess(res, "Reserva creada correctamente", reserva, 201);
};

export const getAll = async (
  req: AuthRequest,
  res: Response
) => {
  const reservas = await listarReservas();

  return sendSuccess(res, "Reservas obtenidas correctamente", reservas);
};

export const myReservations = async (
  req: AuthRequest,
  res: Response
) => {
  const reservas = await listarMisReservas(
    req.usuario.id
  );

  return sendSuccess(res, "Mis reservas obtenidas correctamente", reservas);
};

export const update = async (
  req: AuthRequest,
  res: Response
) => {
  const reserva = await actualizarReserva(
    Number(req.params.id),
    req.body.estado
  );

  return sendSuccess(res, "Reserva actualizada correctamente", reserva);
};

export const remove = async (
  req: AuthRequest,
  res: Response
) => {
  await eliminarReserva(
    Number(req.params.id)
  );

  return sendSuccess(res, "Reserva eliminada correctamente");
};
