import { z } from "zod";
import { idParamSchema } from "./common.schema";

const estadoReservaSchema = z.enum([
  "PENDIENTE",
  "CONFIRMADA",
  "CANCELADA",
  "FINALIZADA"
]);

export const createReservaSchema = z.object({
  body: z.object({
    fecha: z.coerce.date({
      error: "La fecha no es valida"
    }),
    servicioId: z.coerce.number().int("El servicioId debe ser entero").positive("El servicioId debe ser positivo")
  })
});

export const updateReservaSchema = idParamSchema.extend({
  body: z.object({
    estado: estadoReservaSchema
  })
});
