"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const appError_1 = require("../utils/appError");
const validate = (schema) => {
    return (req, res, next) => {
        try {
            const parsed = schema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            });
            req.body = parsed.body ?? req.body;
            req.params = parsed.params ?? req.params;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.issues.map((issue) => issue.message);
                return next(new appError_1.AppError("Datos invalidos", 400, errors));
            }
            next(error);
        }
    };
};
exports.validate = validate;
