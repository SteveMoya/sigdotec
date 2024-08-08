import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";
import { roles } from "@/schemas/";
import { Pay } from "@/services/pay.services";
import { generateId } from "lucia";
import argon2id from 'argon2'

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
    const { name, email, balance, role, onConfirm, password } = body;
    if (!name || !email || !balance || !role || !onConfirm) {
        console.log("Faltan campos");
        return new Response("Faltan campos", { status: 400 });
    }
    if(onConfirm === false){
        console.log("Creacion del Usuario no confirmado");
        return new Response("Creacion del Usuario no confirmado", { status: 400 });
    }
    if (typeof name !== "string" || name.length < 4) {
        console.log("El Nombre del Usuario tiene que ser mayor a 4");
        return new Response("El Nombre del Usuario tiene que ser mayor a 4", {
            status: 400,
        });
    }
    if (typeof email !== "string" || !email.includes("@")) {
        console.log("Correo no valido");
        return new Response("Correo no valido", { status: 400 });
    }
    if (typeof balance !== "string" || !/^\d+(\.\d{1,2})?$/.test(balance)) {
        console.log("Balance no valido");
        return new Response("Balance no valido", { status: 400 });
    }
    if (typeof password !== "string" || password.length < 4) {
        console.log("La contraseña tiene que tener por lo menos 4 caracteres");
        return new Response("La contraseña tiene que tener por lo menos 4 caracteres", {
            status: 400,
        })
    }
    if (typeof role !== "string" || !roles.includes(role as any)) {
        console.log("Role no valido");
        return new Response("Role no valido", { status: 400 })
    }
   
    const foundUser = (
        await db.select().from(User).where(eq(User.email, email))
    ).at(0);
    if (foundUser) {
        console.log("El usuario Ya existe");
        return new Response("El usuario Ya existe", {
            status: 400,
        });
    }
    const userId = generateId(15);
    const hashedPassword = await argon2id.hash(password);
    try {
        await db.insert(User).values({
            id: userId,
            username: name,
            email,
            role,
            emailVerificated: true,
            hashedPassword,
            balance: parseFloat(balance),
            createdAt: new Date(),
        })
        

       console.log("Nuevo Usuario",);
       return new Response("Usuario Creado Existosamente", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Error interno del servidor.", { status: 500 });
    }
}