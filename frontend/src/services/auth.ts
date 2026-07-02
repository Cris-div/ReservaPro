import api from "@/lib/axios";
import { ApiResponse, AuthResponse, Usuario } from "@/types/user";

export const login = async (
  correo: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", {
    correo,
    password,
  });

  return response.data;
};

export const register = async (
  nombre: string,
  correo: string,
  password: string
): Promise<ApiResponse<Usuario>> => {
  const response = await api.post("/auth/register", {
    nombre,
    correo,
    password,
  });

  return response.data;
};

export const perfil = async (): Promise<ApiResponse<Usuario>> => {
  const response = await api.get("/auth/perfil");

  return response.data;
};
