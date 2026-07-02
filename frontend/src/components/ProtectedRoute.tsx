"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "./Loader";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { loading, token } = useAuth();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login");
    }
  }, [loading, router, token]);

  if (loading) {
    return <Loader label="Verificando sesion..." />;
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
