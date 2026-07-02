export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: "ADMIN" | "OPERADOR" | "CLIENTE";
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    usuario: Usuario;
  };
}
