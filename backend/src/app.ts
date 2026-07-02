import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import servicioRoutes from "./routes/servicio.routes";
import reservaRoutes from "./routes/reserva.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { sendSuccess } from "./utils/response";

const app = express();
const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
  origin: allowedOrigin ?? true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/servicios", servicioRoutes);
app.use("/api/reservas", reservaRoutes);

app.get("/", (req, res) => {
  return sendSuccess(res, "API ReservaPro funcionando");
});

app.use(errorHandler);

export default app;
