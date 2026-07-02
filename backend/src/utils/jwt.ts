import jwt from "jsonwebtoken";

export const generarToken = (id: number, rol: string) => {

    return jwt.sign(
        {
            id,
            rol
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1d"
        }
    );

};