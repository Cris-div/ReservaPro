import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "ReservaPro",
    template: "%s | ReservaPro"
  },
  description: "Sistema web para gestionar servicios, clientes y reservas de horarios.",
  keywords: ["reservas", "servicios", "dashboard", "ReservaPro"],
  authors: [{ name: "Ricardo Coello" }],
  creator: "Ricardo Coello",
  openGraph: {
    title: "ReservaPro",
    description: "Plataforma de reservas de servicios con roles y panel administrativo.",
    type: "website",
    locale: "es_PE"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
