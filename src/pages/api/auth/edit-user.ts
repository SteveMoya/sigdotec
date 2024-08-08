import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";
import { roles } from "@/schemas/";
import { Pay } from "@/services/pay.services";
import { generateId } from "lucia";
import argon2id from 'argon2'

export async function POST(context: APIContext): Promise<Response> {
    // optemenos el id del searchParams
    
    const user = context.locals.user
    if (!user) {
        return new Response("Unauthorized", { status: 401 })
    }
    if (user.role !== "admin" ){
        return new Response("Unauthorized", { status: 401 })
    }

    const body = await context.request.json();
    console.log("Cuerpo de la petición", body);
    const { balance, role, onConfirm, id } = body;

    if ( !balance || !role || !onConfirm || !id) {
        console.log("Faltan campos");
        return new Response("Faltan campos", { status: 400 });
    }
    if(typeof id !== "string" || id.length !== 15){
        console.log("ID no valido");
        return new Response("ID no valido", { status: 400 });
    }
    if(onConfirm === false){
        console.log("Creacion del Usuario no confirmado");
        return new Response("Creacion del Usuario no confirmado", { status: 400 });
    }
   
    if (typeof balance !== "string" || !/^\d+(\.\d{1,2})?$/.test(balance)) {
        console.log("Balance no valido");
        return new Response("Balance no valido", { status: 400 });
    }
    
    if (typeof role !== "string" || !roles.includes(role as any)) {
        console.log("Role no valido");
        return new Response("Role no valido", { status: 400 })
    }
   
    const foundUser = (
        await db.select().from(User).where(eq(User.id, id))
    ).at(0);
    if (!foundUser) {
        console.log("El usuario no existe");
        return new Response("El usuario no existe", {
            status: 400,
        });
    }
    const newBalance = parseFloat(balance);
    if (newBalance < 0) {
        console.log("Balance no puede ser negativo");
        return new Response("Balance no puede ser negativo", { status: 400 });
    }
    try {
        // modificamos los datos en la db
        await db.update(User).set({
            role,
            balance: newBalance,
        }).where(eq(User.id, id));
        
       return new Response("Usuario Editado Existosamente", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Error interno del servidor.", { status: 500 });
    }
}