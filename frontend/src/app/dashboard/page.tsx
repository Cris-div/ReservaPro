"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { usuario } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-500">
            Bienvenido, {usuario?.nombre}. Desde aqui puedes administrar servicios y reservas.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-slate-900">Servicios</h3>
            <p className="mt-2 text-sm text-slate-500">Crea, edita y elimina los servicios disponibles.</p>
            <Link className="mt-4 inline-block text-sm font-medium text-slate-900 underline" href="/servicios">
              Gestionar servicios
            </Link>
          </Card>

          <Card className="p-5">
            <h3 className="text-lg font-semibold text-slate-900">Reservas</h3>
            <p className="mt-2 text-sm text-slate-500">Administra reservas, estados, usuarios y servicios.</p>
            <Link className="mt-4 inline-block text-sm font-medium text-slate-900 underline" href="/reservas">
              Gestionar reservas
            </Link>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
