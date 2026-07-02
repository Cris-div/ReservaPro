import { PrismaClient, Rol, EstadoReserva } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  {
    nombre: "Admin ReservaPro",
    correo: "admin@reservapro.com",
    password: "Admin123",
    rol: Rol.ADMIN
  },
  {
    nombre: "Operador Principal",
    correo: "operador@reservapro.com",
    password: "Operador123",
    rol: Rol.OPERADOR
  },
  {
    nombre: "Cliente Demo",
    correo: "cliente@reservapro.com",
    password: "Cliente123",
    rol: Rol.CLIENTE
  },
  {
    nombre: "Maria Torres",
    correo: "maria@reservapro.com",
    password: "Cliente123",
    rol: Rol.CLIENTE
  },
  {
    nombre: "Luis Mendoza",
    correo: "luis@reservapro.com",
    password: "Cliente123",
    rol: Rol.CLIENTE
  }
];

const services = [
  {
    nombre: "Salon para evento corporativo",
    descripcion: "Reserva de sala equipada para reuniones, capacitaciones y presentaciones.",
    precio: 180,
    duracion: 120,
    activo: true
  },
  {
    nombre: "Decoracion para cumpleanos",
    descripcion: "Servicio de ambientacion tematica con montaje y desmontaje incluido.",
    precio: 250,
    duracion: 180,
    activo: true
  },
  {
    nombre: "Sesion fotografica",
    descripcion: "Cobertura fotografica profesional para eventos sociales o empresariales.",
    precio: 320,
    duracion: 120,
    activo: true
  },
  {
    nombre: "Asesoria para bodas",
    descripcion: "Planificacion de agenda, proveedores y coordinacion del dia del evento.",
    precio: 450,
    duracion: 90,
    activo: true
  },
  {
    nombre: "Catering ejecutivo",
    descripcion: "Coffee break y bocaditos para reuniones de trabajo y lanzamientos.",
    precio: 380,
    duracion: 150,
    activo: true
  },
  {
    nombre: "Servicio archivado",
    descripcion: "Servicio de ejemplo inactivo para validar estados en la interfaz.",
    precio: 120,
    duracion: 60,
    activo: false
  }
];

const addDays = (days: number, hour: number, minutes = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, minutes, 0, 0);
  return date;
};

async function main() {
  const passwordCache = new Map<string, string>();

  for (const user of users) {
    let passwordHash = passwordCache.get(user.password);

    if (!passwordHash) {
      passwordHash = await bcrypt.hash(user.password, 10);
      passwordCache.set(user.password, passwordHash);
    }

    await prisma.usuario.upsert({
      where: {
        correo: user.correo
      },
      update: {
        nombre: user.nombre,
        rol: user.rol
      },
      create: {
        nombre: user.nombre,
        correo: user.correo,
        password: passwordHash,
        rol: user.rol
      }
    });
  }

  for (const service of services) {
    const existingService = await prisma.servicio.findFirst({
      where: {
        nombre: service.nombre
      }
    });

    if (existingService) {
      await prisma.servicio.update({
        where: {
          id: existingService.id
        },
        data: {
          descripcion: service.descripcion,
          precio: service.precio,
          duracion: service.duracion,
          activo: service.activo
        }
      });
    } else {
      await prisma.servicio.create({
        data: service
      });
    }
  }

  const clienteDemo = await prisma.usuario.findUniqueOrThrow({
    where: {
      correo: "cliente@reservapro.com"
    }
  });

  const maria = await prisma.usuario.findUniqueOrThrow({
    where: {
      correo: "maria@reservapro.com"
    }
  });

  const luis = await prisma.usuario.findUniqueOrThrow({
    where: {
      correo: "luis@reservapro.com"
    }
  });

  const servicios = await prisma.servicio.findMany({
    where: {
      activo: true
    },
    orderBy: {
      id: "asc"
    }
  });

  const reservas = [
    {
      fecha: addDays(1, 9),
      estado: EstadoReserva.PENDIENTE,
      usuarioId: clienteDemo.id,
      servicioId: servicios[0].id
    },
    {
      fecha: addDays(2, 15, 30),
      estado: EstadoReserva.CONFIRMADA,
      usuarioId: maria.id,
      servicioId: servicios[1].id
    },
    {
      fecha: addDays(4, 11),
      estado: EstadoReserva.PENDIENTE,
      usuarioId: luis.id,
      servicioId: servicios[2].id
    },
    {
      fecha: addDays(6, 17),
      estado: EstadoReserva.FINALIZADA,
      usuarioId: clienteDemo.id,
      servicioId: servicios[3].id
    },
    {
      fecha: addDays(8, 10),
      estado: EstadoReserva.CANCELADA,
      usuarioId: maria.id,
      servicioId: servicios[4].id
    }
  ];

  for (const reserva of reservas) {
    const exists = await prisma.reserva.findFirst({
      where: {
        fecha: reserva.fecha,
        servicioId: reserva.servicioId
      }
    });

    if (!exists) {
      await prisma.reserva.create({
        data: reserva
      });
    }
  }
}

main()
  .then(async () => {
    console.log("Datos iniciales creados correctamente");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
