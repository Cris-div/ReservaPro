import { Reserva } from "@/types/reserva";
import { Card } from "./Card";

export function ReservaCard({ reserva }: { reserva: Reserva }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900">
            {reserva.servicio?.nombre ?? `Servicio #${reserva.servicioId}`}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {new Intl.DateTimeFormat("es-PE", {
              dateStyle: "medium",
              timeStyle: "short"
            }).format(new Date(reserva.fecha))}
          </p>
        </div>
        <span className="text-sm font-medium text-slate-900">{reserva.estado}</span>
      </div>
    </Card>
  );
}
