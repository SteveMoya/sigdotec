import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";

export async function GET(context: APIContext): Promise<Response> {
    const user = context.locals.user
    if (!user) {
        return new Response("Unauthorized", { status: 401 })
    }
    try {
        const amount = user.balance;
        await db.update(User).set({ balance: (Number(amount) + 1000) }).where(eq(User.id, user.id));
        return context.redirect("/app/cartera");
    }
    catch (error) {
        return new Response("Error al insertar el dinero", { status: 500 })
    }
   

}