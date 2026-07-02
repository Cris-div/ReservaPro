# ReservaPro - Modulo 4 Sistema de Reservas

## Objetivo
Desarrollar una aplicacion web moderna para digitalizar la gestion de reservas de servicios, permitiendo registro de clientes, autenticacion, administracion de servicios, reserva de horarios, confirmacion de reservas e historial.

## Arquitectura
- Frontend: Next.js 16 App Router, TypeScript, React Hook Form, Zod, Axios y js-cookie.
- Backend: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, JWT, bcrypt y Zod.
- Base de datos: PostgreSQL con entidades Usuario, Servicio y Reserva.
- Integracion: Frontend consume la API REST mediante servicios tipados y Axios.

## Roles
- Cliente: registra cuenta, inicia sesion y crea/consulta sus reservas.
- Operador: consulta reservas y actualiza estados.
- Administrador: gestiona servicios y reservas.

## Funcionalidades implementadas
- Registro e inicio de sesion.
- JWT con rutas protegidas.
- Roles y permisos.
- CRUD de servicios.
- CRUD de reservas.
- Reserva de horarios con validacion para evitar duplicados por servicio y fecha.
- Confirmacion/cambio de estado de reservas.
- Historial de reservas del cliente.
- Validaciones frontend y backend con Zod.
- Manejo de errores consistente.
- SEO basico con metadata, sitemap y robots.
- Diseño responsive con navegacion clara.

## Entidades CRUD
- Usuarios: registro, login y perfil autenticado.
- Servicios: crear, listar, editar y eliminar.
- Reservas: crear, listar, editar estado y eliminar.

## Evidencias sugeridas para capturas
- Login.
- Registro.
- Dashboard.
- Gestion de servicios.
- Modal de crear/editar servicio.
- Gestion de reservas.
- Modal de crear reserva.
- Cambio de estado de reserva.
- Error de validacion.
- Ruta protegida redirigiendo al login.

## Variables de entorno
Backend:
```env
DATABASE_URL="postgresql://usuario:password@host:5432/reservapro"
JWT_SECRET="cambia-este-secreto"
PORT=3001
FRONTEND_URL="https://tu-frontend.vercel.app"
```

Frontend:
```env
NEXT_PUBLIC_API_URL="https://tu-backend.onrender.com/api"
NEXT_PUBLIC_APP_URL="https://tu-frontend.vercel.app"
```

## Despliegue
- Backend: Render o Railway.
- Frontend: Vercel.
- Configurar variables de entorno en ambos servicios.
- En frontend usar la URL publica del backend en `NEXT_PUBLIC_API_URL`.
- En backend usar la URL publica del frontend en `FRONTEND_URL`.

## Credenciales de prueba
Crear un usuario administrador en base de datos o ajustar el rol de un usuario registrado a `ADMIN`.

## Conclusiones
ReservaPro cumple con los requerimientos del Modulo 4 al integrar backend y frontend, seguridad con JWT, roles, validaciones, gestion de reservas y despliegue preparado mediante variables de entorno.
