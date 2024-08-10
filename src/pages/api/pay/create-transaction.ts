import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";
import { typesTransaction } from "@/schemas/transactions";
import { Pay } from "@/services/pay.services";

export async function POST(context: APIContext): Promise<Response> {
    const user = context.locals.user
    if (!user) {
        return new Response("Unauthorized", { status: 401 })
    }
    if (user.role !== "admin" ){
        return new Response("Unauthorized", { status: 401 })
    }

    const body = await context.request.json();
    console.log("Cuerpo de la petición", body);
    const { transactionid, email, amount, type, createdAt, onConfirm } = body;
    if (!transactionid || !email || !amount || !type || !createdAt || !onConfirm) {
        console.log("Faltan campos");
        return new Response("Faltan campos", { status: 400 });
    }
    if(onConfirm === false){
        console.log("Pago no confirmado");
        return new Response("Pago no confirmado", { status: 400 });
    }
    if (typeof transactionid !== "string" || transactionid.length < 4) {
        console.log("El id de la transaccion tiene que ser mayor a 4");
        return new Response("El id de la transaccion tiene que ser mayor a 4", {
            status: 400,
        });
    }
    if (typeof email !== "string" || !email.includes("@")) {
        console.log("Correo no valido");
        return new Response("Correo no valido", { status: 400 });
    }
    if (typeof createdAt !== "string" || new Date(createdAt).toString() === "Invalid Date") {
        console.log("Fecha no valida");
        return new Response("Fecha no valida", { status: 400 })
    }
    if (typeof type !== "string" || !typesTransaction.includes(type as any)) {
        console.log("Tipo de transaccion no valido");
        return new Response("Tipo de transaccion no valido", { status: 400 })
    }
   
    const foundUser = (
        await db.select().from(User).where(eq(User.email, email))
    ).at(0);
    if (!foundUser) {
        console.log("El usuario no Existe");
        return new Response("El usuario no Existe", {
            status: 400,
        });
    }
    
    try {
        const newTransaccion = await Pay.createTransaction(foundUser.id, Number(amount), type, transactionid, new Date(createdAt));
        if (!newTransaccion) {
            console.log("Error al actualizar el saldo.");
            return new Response("Error al actualizar el saldo.", { status: 500 });
        }

       console.log("Nueva transaccion", newTransaccion);
       return new Response("Pago realizado", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Error interno del servidor.", { status: 500 });
    }
}