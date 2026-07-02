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
import { useAuth } from "@/hooks/useAuth";
import * as servicioService from "@/services/servicio";
import { Servicio } from "@/types/servicio";
import { getErrorMessage } from "@/utils/getErrorMessage";

const servicioSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  descripcion: z.string().min(5, "La descripcion debe tener al menos 5 caracteres"),
  precio: z.number().positive("El precio debe ser mayor a 0"),
  duracion: z.number().int("La duracion debe ser entera").positive("La duracion debe ser mayor a 0"),
  activo: z.boolean()
});

type ServicioForm = z.infer<typeof servicioSchema>;

const defaultValues: ServicioForm = {
  nombre: "",
  descripcion: "",
  precio: 0,
  duracion: 0,
  activo: true
};

export default function ServiciosPage() {
  const { usuario } = useAuth();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingServicio, setEditingServicio] = useState<Servicio | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError: setFormError,
    formState: { errors }
  } = useForm<ServicioForm>({
    resolver: zodResolver(servicioSchema),
    defaultValues
  });
  const canManageServicios = usuario?.rol === "ADMIN";

  const loadServicios = async () => {
    try {
      setError("");
      const data = await servicioService.listarServicios();
      setServicios(canManageServicios ? data : data.filter((servicio) => servicio.activo));
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    servicioService.listarServicios()
      .then((data) => {
        if (active) {
          setError("");
          setServicios(canManageServicios ? data : data.filter((servicio) => servicio.activo));
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
  }, [canManageServicios]);

  const openCreateModal = () => {
    setEditingServicio(null);
    reset(defaultValues);
    setModalOpen(true);
  };

  const openEditModal = (servicio: Servicio) => {
    setEditingServicio(servicio);
    reset({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precio: servicio.precio,
      duracion: servicio.duracion,
      activo: servicio.activo
    });
    setModalOpen(true);
  };

  const onSubmit = async (data: ServicioForm) => {
    try {
      setSaving(true);

      if (editingServicio) {
        await servicioService.actualizarServicio(editingServicio.id, data);
      } else {
        await servicioService.crearServicio(data);
      }

      setModalOpen(false);
      await loadServicios();
    } catch (requestError) {
      setFormError("root", {
        message: getErrorMessage(requestError)
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteServicio = async (servicio: Servicio) => {
    const confirmed = window.confirm(`Eliminar el servicio "${servicio.nombre}"?`);

    if (!confirmed) {
      return;
    }

    try {
      await servicioService.eliminarServicio(servicio.id);
      await loadServicios();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  const columns = [
    { header: "Nombre", render: (servicio: Servicio) => servicio.nombre },
    { header: "Descripcion", render: (servicio: Servicio) => servicio.descripcion },
    { header: "Precio", render: (servicio: Servicio) => `S/ ${servicio.precio.toFixed(2)}` },
    { header: "Duracion", render: (servicio: Servicio) => `${servicio.duracion} min` },
    ...(canManageServicios ? [{ header: "Estado", render: (servicio: Servicio) => servicio.activo ? "Activo" : "Inactivo" }] : []),
    ...(canManageServicios ? [{
      header: "Acciones",
      render: (servicio: Servicio) => (
        <div className="flex gap-2">
          <Button type="button" variant="secondary" onClick={() => openEditModal(servicio)}>
            Editar
          </Button>
          <Button type="button" variant="danger" onClick={() => deleteServicio(servicio)}>
            Eliminar
          </Button>
        </div>
      )
    }] : [])
  ];

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Servicios</h2>
            <p className="mt-1 text-sm text-slate-500">
              {canManageServicios ? "Administra la oferta disponible para reservas." : "Consulta los servicios disponibles para reservar."}
            </p>
          </div>
          {canManageServicios ? (
            <Button type="button" onClick={openCreateModal}>
              Nuevo servicio
            </Button>
          ) : null}
        </div>

        {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

        {loading ? (
          <Loader />
        ) : (
          <Table columns={columns} data={servicios} emptyMessage="No hay servicios registrados" />
        )}
      </div>

      <Modal
        open={modalOpen}
        title={editingServicio ? "Editar servicio" : "Nuevo servicio"}
        onClose={() => setModalOpen(false)}
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Nombre" error={errors.nombre?.message} {...register("nombre")} />
          <Input label="Descripcion" error={errors.descripcion?.message} {...register("descripcion")} />
          <Input
            label="Precio"
            type="number"
            step="0.01"
            error={errors.precio?.message}
            {...register("precio", { valueAsNumber: true })}
          />
          <Input
            label="Duracion en minutos"
            type="number"
            error={errors.duracion?.message}
            {...register("duracion", { valueAsNumber: true })}
          />

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" className="h-4 w-4" {...register("activo")} />
            Servicio activo
          </label>

          {errors.root?.message ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errors.root.message}</p>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
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
