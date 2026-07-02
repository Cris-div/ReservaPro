import prisma from "../config/database";
import bcrypt from "bcryptjs";
import { generarToken } from "../utils/jwt";
import { AppError } from "../utils/appError";

const usuarioSelect = {
  id: true,
  nombre: true,
  correo: true,
  rol: true
};

export const registerUser = async (
  nombre: string,
  correo: string,
  password: string
) => {
  const existe = await prisma.usuario.findUnique({
    where: {
      correo
    }
  });

  if (existe) {
    throw new AppError("El correo ya esta registrado", 400);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return await prisma.usuario.create({
    data: {
      nombre,
      correo,
      password: passwordHash
    },
    select: usuarioSelect
  });
};

export const loginUser = async (
  correo: string,
  password: string
) => {
  const usuario = await prisma.usuario.findUnique({
    where: {
      correo
    }
  });

  if (!usuario) {
    throw new AppError("Correo o contrasena incorrectos", 401);
  }

  const coincide = await bcrypt.compare(
    password,
    usuario.password
  );

  if (!coincide) {
    throw new AppError("Correo o contrasena incorrectos", 401);
  }

  const token = generarToken(
    usuario.id,
    usuario.rol
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    }
  };
};

export const getPerfilUser = async (id: number) => {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id
    },
    select: usuarioSelect
  });

  if (!usuario) {
    throw new AppError("Usuario no encontrado", 404);
  }

  return usuario;
};
