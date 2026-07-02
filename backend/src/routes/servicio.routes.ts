import { Router } from "express";
import { create, getAll, getById, update, remove } from "../controllers/servicio.controller";
import { verificarToken } from "../middlewares/auth.middleware";
import { verificarRol } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";
import { idParamSchema } from "../schemas/common.schema";
import { createServicioSchema, updateServicioSchema } from "../schemas/servicio.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
  "/",
  verificarToken,
  verificarRol("ADMIN"),
  validate(createServicioSchema),
  asyncHandler(create)
);

router.get(
  "/",
  asyncHandler(getAll)
);

router.get(
  "/:id",
  validate(idParamSchema),
  asyncHandler(getById)
);

router.put(
  "/:id",
  verificarToken,
  verificarRol("ADMIN"),
  validate(updateServicioSchema),
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
