"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";

const loginSchema = z.object({
  correo: z.string().email("Ingrese un correo valido"),
  password: z.string().min(1, "Ingrese su contrasena")
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      correo: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.correo, data.password);
      router.push("/dashboard");
    } catch (error) {
      setError("root", {
        message: getErrorMessage(error)
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <Card className="w-full max-w-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Iniciar sesion</h1>
          <p className="mt-1 text-sm text-slate-500">Accede a ReservaPro para gestionar servicios y reservas.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Correo"
            type="email"
            placeholder="correo@empresa.com"
            error={errors.correo?.message}
            {...register("correo")}
          />

          <Input
            label="Contrasena"
            type="password"
            placeholder="Tu contrasena"
            error={errors.password?.message}
            {...register("password")}
          />

          {errors.root?.message ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errors.root.message}</p>
          ) : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          No tienes cuenta?{" "}
          <Link className="font-medium text-slate-900 underline" href="/register">
            Registrate
          </Link>
        </p>
      </Card>
    </main>
  );
}
