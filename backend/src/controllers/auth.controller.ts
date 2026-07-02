import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getPerfilUser, loginUser, registerUser } from "../services/auth.service";
import { sendSuccess } from "../utils/response";

export const register = async (req: Request, res: Response) => {
  const { nombre, correo, password } = req.body;

  const usuario = await registerUser(
    nombre,
    correo,
    password
  );

  return sendSuccess(res, "Usuario registrado correctamente", usuario, 201);
};

export const login = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  const data = await loginUser(
    correo,
    password
  );

  return sendSuccess(res, "Login correcto", data);
};

export const perfil = async (req: AuthRequest, res: Response) => {
  const usuario = await getPerfilUser(req.usuario.id);

  return sendSuccess(res, "Perfil obtenido correctamente", usuario);
};
