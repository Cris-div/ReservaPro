import { Router } from "express";

import {
  create,
  getAll,
  myReservations,
  update,
  remove
} from "../controllers/reserva.controller";

import { verificarToken } from "../middlewares/auth.middleware";
import { verificarRol } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";
import { idParamSchema } from "../schemas/common.schema";
import { createReservaSchema, updateReservaSchema } from "../schemas/reserva.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
  "/",
  verificarToken,
  validate(createReservaSchema),
  asyncHandler(create)
);

router.get(
  "/",
  verificarToken,
  verificarRol("ADMIN", "OPERADOR"),
  asyncHandler(getAll)
);

router.get(
  "/mis-reservas",
  verificarToken,
  asyncHandler(myReservations)
);

router.put(
  "/:id",
  verificarToken,
  verificarRol("ADMIN", "OPERADOR"),
  validate(updateReservaSchema),
  asyncHandler(update)
);

router.delete(
  "/:id",
  verificarToken,
  verificarRol("ADMIN"),
  validate(idParamSchema),
  asyncHandler(remove)
);

export default router;
