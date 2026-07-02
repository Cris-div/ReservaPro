"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = void 0;
const zod_1 = require("zod");
exports.idParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.coerce.number().int("El id debe ser entero").positive("El id debe ser positivo")
    })
});
