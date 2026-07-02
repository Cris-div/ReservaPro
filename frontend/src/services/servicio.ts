import api from "@/lib/axios";
import { Servicio, ServicioFormValues } from "@/types/servicio";
import { ApiResponse } from "@/types/user";

export const listarServicios = async (): Promise<Servicio[]> => {
  const response = await api.get<ApiResponse<Servicio[]>>("/servicios");
  return response.data.data;
};

export const crearServicio = async (data: ServicioFormValues): Promise<Servicio> => {
  const response = await api.post<ApiResponse<Servicio>>("/servicios", data);
  return response.data.data;
};

export const actualizarServicio = async (
  id: number,
  data: Partial<ServicioFormValues>
): Promise<Servicio> => {
  const response = await api.put<ApiResponse<Servicio>>(`/servicios/${id}`, data);
  return response.data.data;
};

export const eliminarServicio = async (id: number): Promise<void> => {
  await api.delete<ApiResponse<null>>(`/servicios/${id}`);
};
