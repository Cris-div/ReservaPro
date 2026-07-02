import prisma from "../config/database";
import { AppError } from "../utils/appError";

const obtenerServicioExistente = async (id: number) => {
  const servicio = await prisma.servicio.findUnique({
    where: {
      id
    }
  });

  if (!servicio) {
    throw new AppError("Servicio no encontrado", 404);
  }

  return servicio;
};

export const crearServicio = async (
  nombre: string,
  descripcion: string,
  precio: number,
  duracion: number
) => {
  return await prisma.servicio.create({
    data: {
      nombre,
      descripcion,
      precio,
      duracion
    }
  });
};

export const listarServicios = async () => {
  return await prisma.servicio.findMany({
    orderBy: {
      id: "asc"
    }
  });
};

export const obtenerServicio = async (id: number) => {
  return await prisma.servicio.findUnique({
    where: {
      id
    }
  });
};

export const actualizarServicio = async (
  id: number,
  data: any
) => {
  await obtenerServicioExistente(id);

  return await prisma.servicio.update({
    where: {
      id
    },
    data
  });
};

export const eliminarServicio = async (
  id: number
) => {
  await obtenerServicioExistente(id);

  return await prisma.servicio.delete({
    where: {
      id
    }
  });
};
