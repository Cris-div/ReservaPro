import { Router } from "express";
import { login, perfil, register } from "../controllers/auth.controller";
import { verificarToken } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(register)
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(login)
);

router.get(
  "/perfil",
  verificarToken,
  asyncHandler(perfil)
);

export default router;
