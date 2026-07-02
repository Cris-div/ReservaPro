import api from "@/lib/axios";
import { Reserva, ReservaEstadoValues, ReservaFormValues } from "@/types/reserva";
import { ApiResponse } from "@/types/user";

export const listarReservas = async (): Promise<Reserva[]> => {
  const response = await api.get<ApiResponse<Reserva[]>>("/reservas");
  return response.data.data;
};

export const listarMisReservas = async (): Promise<Reserva[]> => {
  const response = await api.get<ApiResponse<Reserva[]>>("/reservas/mis-reservas");
  return response.data.data;
};

export const crearReserva = async (data: ReservaFormValues): Promise<Reserva> => {
  const response = await api.post<ApiResponse<Reserva>>("/reservas", data);
  return response.data.data;
};

export const actualizarReserva = async (
  id: number,
  data: ReservaEstadoValues
): Promise<Reserva> => {
  const response = await api.put<ApiResponse<Reserva>>(`/reservas/${id}`, data);
  return response.data.data;
};

export const eliminarReserva = async (id: number): Promise<void> => {
  await api.delete<ApiResponse<null>>(`/reservas/${id}`);
};
