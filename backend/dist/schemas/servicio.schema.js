"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServicioSchema = exports.createServicioSchema = void 0;
const zod_1 = require("zod");
const common_schema_1 = require("./common.schema");
exports.createServicioSchema = zod_1.z.object({
    body: zod_1.z.object({
        nombre: zod_1.z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
        descripcion: zod_1.z.string().trim().min(5, "La descripcion debe tener al menos 5 caracteres"),
        precio: zod_1.z.coerce.number().positive("El precio debe ser mayor a 0"),
        duracion: zod_1.z.coerce.number().int("La duracion debe ser entera").positive("La duracion debe ser mayor a 0")
    })
});
exports.updateServicioSchema = common_schema_1.idParamSchema.extend({
    body: zod_1.z.object({
        nombre: zod_1.z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").optional(),
        descripcion: zod_1.z.string().trim().min(5, "La descripcion debe tener al menos 5 caracteres").optional(),
        precio: zod_1.z.coerce.number().positive("El precio debe ser mayor a 0").optional(),
        duracion: zod_1.z.coerce.number().int("La duracion debe ser entera").positive("La duracion debe ser mayor a 0").optional(),
        activo: zod_1.z.boolean().optional()
    }).refine((data) => Object.keys(data).length > 0, {
        message: "Debe enviar al menos un campo para actualizar"
    })
});
