"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/Button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/Input";
import { Loader } from "@/components/Loader";
import { Modal } from "@/components/Modal";
import { Table } from "@/components/Table";
import * as reservaService from "@/services/reserva";
import * as servicioService from "@/services/servicio";
import { useAuth } from "@/hooks/useAuth";
import { EstadoReserva, Reserva } from "@/types/reserva";
import { Servicio } from "@/types/servicio";
import { getErrorMessage } from "@/utils/getErrorMessage";

const reservaSchema = z.object({
  fecha: z.string().min(1, "Seleccione una fecha"),
  servicioId: z.number().int("Seleccione un servicio").positive("Seleccione un servicio")
});

const estadoSchema = z.object({
  estado: z.enum(["PENDIENTE", "CONFIRMADA", "CANCELADA", "FINALIZADA"])
});

type ReservaForm = z.infer<typeof reservaSchema>;
type EstadoForm = z.infer<typeof estadoSchema>;

const estados: EstadoReserva[] = ["PENDIENTE", "CONFIRMADA", "CANCELADA", "FINALIZADA"];

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
};

export default function ReservasPage() {
  const { usuario } = useAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingReserva, setEditingReserva] = useState<Reserva | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError: setFormError,
    formState: { errors }
  } = useForm<ReservaForm>({
    resolver: zodResolver(reservaSchema),
    defaultValues: {
      fecha: "",
      servicioId: 0
    }
  });

  const {
    register: registerEstado,
    handleSubmit: handleEstadoSubmit,
    reset: resetEstado,
    setError: setEstadoError,
    formState: { errors: estadoErrors }
  } = useForm<EstadoForm>({
    resolver: zodResolver(estadoSchema),
    defaultValues: {
      estado: "PENDIENTE"
    }
  });
  const canUpdateReserva = usuario?.rol === "ADMIN" || usuario?.rol === "OPERADOR";
  const canDeleteReserva = usuario?.rol === "ADMIN";

  const loadData = async () => {
    try {
      setError("");
      const [serviciosData, reservasData] = await Promise.all([
        servicioService.listarServicios(),
        usuario?.rol === "CLIENTE" ? reservaService.listarMisReservas() : reservaService.listarReservas()
      ]);

      setServicios(serviciosData.filter((servicio) => servicio.activo));
      setReservas(reservasData);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!usuario) {
      return;
    }

    let active = true;

    Promise.all([
      servicioService.listarServicios(),
      usuario.rol === "CLIENTE" ? reservaService.listarMisReservas() : reservaService.listarReservas()
    ])
      .then(([serviciosData, reservasData]) => {
        if (active) {
          setError("");
          setServicios(serviciosData.filter((servicio) => servicio.activo));
          setReservas(reservasData);
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(getErrorMessage(requestError));
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [usuario]);

  const openCreateModal = () => {
    reset({
      fecha: "",
      servicioId: 0
    });
    setCreateModalOpen(true);
  };

  const openEditModal = (reserva: Reserva) => {
    setEditingReserva(reserva);
    resetEstado({
      estado: reserva.estado
    });
    setEditModalOpen(true);
  };

  const onCreate = async (data: ReservaForm) => {
    try {
      setSaving(true);
      await reservaService.crearReserva(data);
      setCreateModalOpen(false);
      await loadData();
    } catch (requestError) {
      setFormError("root", {
        message: getErrorMessage(requestError)
      });
    } finally {
      setSaving(false);
    }
  };

  const onUpdateEstado = async (data: EstadoForm) => {
    if (!editingReserva) {
      return;
    }

    try {
      setSaving(true);
      await reservaService.actualizarReserva(editingReserva.id, data);
      setEditModalOpen(false);
      await loadData();
    } catch (requestError) {
      setEstadoError("root", {
        message: getErrorMessage(requestError)
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteReserva = async (reserva: Reserva) => {
    const confirmed = window.confirm(`Eliminar la reserva #${reserva.id}?`);

    if (!confirmed) {
      return;
    }

    try {
      await reservaService.eliminarReserva(reserva.id);
      await loadData();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  const columns = [
    { header: "Fecha", render: (reserva: Reserva) => formatDate(reserva.fecha) },
    { header: "Servicio", render: (reserva: Reserva) => reserva.servicio?.nombre ?? `Servicio #${reserva.servicioId}` },
    { header: "Usuario", render: (reserva: Reserva) => reserva.usuario?.nombre ?? usuario?.nombre ?? "Usuario" },
    { header: "Estado", render: (reserva: Reserva) => reserva.estado },
    ...(canUpdateReserva || canDeleteReserva ? [{
      header: "Acciones",
      render: (reserva: Reserva) => (
        <div className="flex gap-2">
          {canUpdateReserva ? (
            <Button type="button" variant="secondary" onClick={() => openEditModal(reserva)}>
              Editar
            </Button>
          ) : null}
          {canDeleteReserva ? (
            <Button type="button" variant="danger" onClick={() => deleteReserva(reserva)}>
              Eliminar
            </Button>
          ) : null}
        </div>
      )
    }] : [])
  ];

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Reservas</h2>
            <p className="mt-1 text-sm text-slate-500">
              {canUpdateReserva ? "Crea reservas y administra su estado." : "Crea reservas y revisa tu historial."}
            </p>
          </div>
          <Button type="button" onClick={openCreateModal}>
            Nueva reserva
          </Button>
        </div>

        {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

        {loading ? (
          <Loader />
        ) : (
          <Table columns={columns} data={reservas} emptyMessage="No hay reservas registradas" />
        )}
      </div>

      <Modal open={createModalOpen} title="Nueva reserva" onClose={() => setCreateModalOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit(onCreate)}>
          <Input label="Fecha" type="datetime-local" error={errors.fecha?.message} {...register("fecha")} />

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">Servicio</span>
            <select
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-slate-900"
              {...register("servicioId", { valueAsNumber: true })}
            >
              <option value={0}>Seleccione un servicio</option>
              {servicios.map((servicio) => (
                <option key={servicio.id} value={servicio.id}>
                  {servicio.nombre} - S/ {servicio.precio.toFixed(2)}
                </option>
              ))}
            </select>
            {errors.servicioId?.message ? (
              <span className="block text-sm text-red-600">{errors.servicioId.message}</span>
            ) : null}
          </label>

          {errors.root?.message ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errors.root.message}</p>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setCreateModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={editModalOpen} title="Editar estado" onClose={() => setEditModalOpen(false)}>
        <form className="space-y-4" onSubmit={handleEstadoSubmit(onUpdateEstado)}>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">Estado</span>
            <select
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-slate-900"
              {...registerEstado("estado")}
            >
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
            {estadoErrors.estado?.message ? (
              <span className="block text-sm text-red-600">{estadoErrors.estado.message}</span>
            ) : null}
          </label>

          {estadoErrors.root?.message ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{estadoErrors.root.message}</p>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
