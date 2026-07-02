import { z } from "zod";
import { idParamSchema } from "./common.schema";

export const createServicioSchema = z.object({
  body: z.object({
    nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
    descripcion: z.string().trim().min(5, "La descripcion debe tener al menos 5 caracteres"),
    precio: z.coerce.number().positive("El precio debe ser mayor a 0"),
    duracion: z.coerce.number().int("La duracion debe ser entera").positive("La duracion debe ser mayor a 0")
  })
});

export const updateServicioSchema = idParamSchema.extend({
  body: z.object({
    nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").optional(),
    descripcion: z.string().trim().min(5, "La descripcion debe tener al menos 5 caracteres").optional(),
    precio: z.coerce.number().positive("El precio debe ser mayor a 0").optional(),
    duracion: z.coerce.number().int("La duracion debe ser entera").positive("La duracion debe ser mayor a 0").optional(),
    activo: z.boolean().optional()
  }).refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviar al menos un campo para actualizar"
  })
});
