import { z } from "zod";

export const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int("El id debe ser entero").positive("El id debe ser positivo")
  })
});
