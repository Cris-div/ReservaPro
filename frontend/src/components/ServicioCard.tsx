import { Servicio } from "@/types/servicio";
import { Card } from "./Card";

export function ServicioCard({ servicio }: { servicio: Servicio }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900">{servicio.nombre}</h3>
          <p className="mt-1 text-sm text-slate-500">{servicio.descripcion}</p>
        </div>
        <span className="text-sm font-medium text-slate-900">S/ {servicio.precio.toFixed(2)}</span>
      </div>
      <p className="mt-3 text-sm text-slate-500">{servicio.duracion} min</p>
    </Card>
  );
}
