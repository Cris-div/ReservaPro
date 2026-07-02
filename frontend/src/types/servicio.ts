export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
  activo: boolean;
}

export interface ServicioFormValues {
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
  activo?: boolean;
}
