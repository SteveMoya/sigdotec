import { z } from "astro/zod"
export const typesTransaction = [
    "Paypal", "ACH",
] as const
export const NewTransactionSchema = z.object({
    transactionid: z.string(),
    email: z.string().email({ message: "El monto no es valido" }),
    amount: z.string().refine((data) => /^\d+(\.\d{1,2})?$/.test(data), {
        message: "El balance tiene que ser un numero valido",
    }),
    type: z.enum(typesTransaction, { message: "El tipo de transaccion no existe" }),
    createdAt: z.date().default(() => new Date()),
    onConfirm: z.boolean(),
})