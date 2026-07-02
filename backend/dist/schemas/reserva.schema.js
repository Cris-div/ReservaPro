"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReservaSchema = exports.createReservaSchema = void 0;
const zod_1 = require("zod");
const common_schema_1 = require("./common.schema");
const estadoReservaSchema = zod_1.z.enum([
    "PENDIENTE",
    "CONFIRMADA",
    "CANCELADA",
    "FINALIZADA"
]);
exports.createReservaSchema = zod_1.z.object({
    body: zod_1.z.object({
        fecha: zod_1.z.coerce.date({
            error: "La fecha no es valida"
        }),
        servicioId: zod_1.z.coerce.number().int("El servicioId debe ser entero").positive("El servicioId debe ser positivo")
    })
});
exports.updateReservaSchema = common_schema_1.idParamSchema.extend({
    body: zod_1.z.object({
        estado: estadoReservaSchema
    })
});
