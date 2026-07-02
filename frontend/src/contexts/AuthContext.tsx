"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import * as authService from "@/services/auth";
import { Usuario } from "@/types/user";

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (correo: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_COOKIE = "token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    Cookies.remove(TOKEN_COOKIE);
    setUsuario(null);
    setToken(null);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = Cookies.get(TOKEN_COOKIE) ?? null;

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.perfil();
        setToken(storedToken);
        setUsuario(response.data);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [logout]);

  async function login(correo: string, password: string) {
    const response = await authService.login(correo, password);
    const nextToken = response.data.token;
    const nextUser = response.data.usuario;

    Cookies.set(TOKEN_COOKIE, nextToken);

    setUsuario(nextUser);
    setToken(nextToken);
  }

  const value = useMemo<AuthContextType>(() => ({
    usuario,
    token,
    loading,
    isAuthenticated: Boolean(token),
    login,
    logout
  }), [usuario, token, loading, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
};
