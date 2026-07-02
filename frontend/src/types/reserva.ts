import { Servicio } from "./servicio";
import { Usuario } from "./user";

export type EstadoReserva = "PENDIENTE" | "CONFIRMADA" | "CANCELADA" | "FINALIZADA";

export interface Reserva {
  id: number;
  fecha: string;
  estado: EstadoReserva;
  usuarioId: number;
  servicioId: number;
  usuario?: Usuario;
  servicio?: Servicio;
  createdAt: string;
}

export interface ReservaFormValues {
  fecha: string;
  servicioId: number;
}

export interface ReservaEstadoValues {
  estado: EstadoReserva;
}
