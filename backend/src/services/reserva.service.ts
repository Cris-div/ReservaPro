import prisma from "../config/database";
import { AppError } from "../utils/appError";

const usuarioSelect = {
  id: true,
  nombre: true,
  correo: true,
  rol: true
};

const obtenerReservaExistente = async (id: number) => {
  const reserva = await prisma.reserva.findUnique({
    where: {
      id
    }
  });

  if (!reserva) {
    throw new AppError("Reserva no encontrada", 404);
  }

  return reserva;
};

const verificarServicioExistente = async (id: number) => {
  const servicio = await prisma.servicio.findUnique({
    where: {
      id
    }
  });

  if (!servicio) {
    throw new AppError("Servicio no encontrado", 404);
  }

  if (!servicio.activo) {
    throw new AppError("El servicio no esta disponible", 400);
  }
};

const verificarHorarioDisponible = async (
  fecha: Date,
  servicioId: number
) => {
  const reserva = await prisma.reserva.findFirst({
    where: {
      fecha,
      servicioId,
      estado: {
        not: "CANCELADA"
      }
    }
  });

  if (reserva) {
    throw new AppError("El horario seleccionado ya esta reservado", 400);
  }
};

export const crearReserva = async (
  fecha: Date,
  usuarioId: number,
  servicioId: number
) => {
  await verificarServicioExistente(servicioId);
  await verificarHorarioDisponible(fecha, servicioId);

  return await prisma.reserva.create({
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

export const listarReservas = async () => {
  return await prisma.reserva.findMany({
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

export const listarMisReservas = async (
  usuarioId: number
) => {
  return await prisma.reserva.findMany({
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

export const actualizarReserva = async (
  id: number,
  estado: any
) => {
  await obtenerReservaExistente(id);

  return await prisma.reserva.update({
    where: {
      id
    },
    data: {
      estado
    }
  });
};

export const eliminarReserva = async (
  id: number
) => {
  await obtenerReservaExistente(id);

  return await prisma.reserva.delete({
    where: {
      id
    }
  });
};
