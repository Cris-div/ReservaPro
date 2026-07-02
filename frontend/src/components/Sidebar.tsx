"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/servicios", label: "Servicios" },
  { href: "/reservas", label: "Reservas" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 border-r border-slate-200 bg-white px-4 py-6 md:block">
      <div className="mb-8 px-2">
        <p className="text-xl font-bold text-slate-900">ReservaPro</p>
        <p className="text-sm text-slate-500">Gestion de reservas</p>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
