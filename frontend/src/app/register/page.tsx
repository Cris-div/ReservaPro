"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import * as authService from "@/services/auth";
import { getErrorMessage } from "@/utils/getErrorMessage";

const registerSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  correo: z.string().email("Ingrese un correo valido"),
  password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirme su contrasena")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contrasenas no coinciden",
  path: ["confirmPassword"]
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: "",
      correo: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await authService.register(data.nombre, data.correo, data.password);
      router.push("/login");
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
          <h1 className="text-2xl font-bold text-slate-900">Crear cuenta</h1>
          <p className="mt-1 text-sm text-slate-500">Registra un usuario cliente en ReservaPro.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Nombre" error={errors.nombre?.message} {...register("nombre")} />
          <Input label="Correo" type="email" error={errors.correo?.message} {...register("correo")} />
          <Input label="Contrasena" type="password" error={errors.password?.message} {...register("password")} />
          <Input
            label="Confirmar contrasena"
            type="password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {errors.root?.message ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errors.root.message}</p>
          ) : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear cuenta"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Ya tienes cuenta?{" "}
          <Link className="font-medium text-slate-900 underline" href="/login">
            Inicia sesion
          </Link>
        </p>
      </Card>
    </main>
  );
}
