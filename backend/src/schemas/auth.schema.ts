import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
    correo: z.string().trim().email("El correo no es valido"),
    password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres")
  })
});

export const loginSchema = z.object({
  body: z.object({
    correo: z.string().trim().email("El correo no es valido"),
    password: z.string().min(1, "La contrasena es requerida")
  })
});
