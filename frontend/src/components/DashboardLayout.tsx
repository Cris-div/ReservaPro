"use client";

import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { ProtectedRoute } from "./ProtectedRoute";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex">
          <Sidebar />
          <div className="min-h-screen flex-1">
            <Navbar />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
