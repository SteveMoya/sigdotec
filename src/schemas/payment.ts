import { z } from "astro/zod"

export const PaymetSchema = z
    .object({
        amount: z.number({
            message: "El monto tiene que ser un número",
        }).int().positive({
            message: "El monto tiene que ser un número positivo",
        }).min(1, {
            message: "El monto tiene que ser mayor a 1",
        }),
    })