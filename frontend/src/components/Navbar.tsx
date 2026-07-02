"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./Button";

export function Navbar() {
  const { usuario, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <p className="text-sm text-slate-500">Panel de administracion</p>
        <h1 className="text-lg font-semibold text-slate-900">ReservaPro</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">{usuario?.nombre ?? "Usuario"}</p>
          <p className="text-xs text-slate-500">{usuario?.rol ?? "Sin rol"}</p>
        </div>
        <Button type="button" variant="secondary" onClick={logout}>
          Salir
        </Button>
      </div>
    </header>
  );
}
