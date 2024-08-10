import type { APIContext } from "astro";

// import classplanmock from '@mocks/classplan.json';
import { PlanService } from "@services/plans.services";
import { CLASS_PRICE } from "@src/utils";
import { db, eq, User } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
    // const data = classplanmock;
    const user = context.locals.user;
    if (!user) {
        return new Response("El usuario no esta authenticado", { status: 401 });
    }

    const amount = user.balance;
    if (!amount) {
        return new Response(JSON.stringify({ error: "Balance requerido" }), {
            headers: { "content-type": "application/json" },
            status: 400,
        });
    }
    if (Number(amount) < CLASS_PRICE) {
        return new Response(JSON.stringify({ error: "No existe suficiente Dinero en tu cartera para poder tener tu plan, ve a cartera y deposita el dinero suficiente" }), {
            headers: { "content-type": "application/json" },
            status: 400,
        });
    }
    const body = await context.request.json();
    // luego aqui convertimos el array de string en un array de numeros
    console.log("Esta es la peticion del usuario",body);
    // const temas = body.map((item: string) => Number
    // (item));
    // console.log("Estos son los temas que se van a guardar", temas);
    
    try {
        const data = await PlanService.getPlanClass(body, user.username, user.id);
        console.log("Estos son los datos que se van a guardar", data);
        // Aqui actualizamos el balance del usuario
        await db.update(User).set({ balance: (Number(amount) - CLASS_PRICE) }).where(eq(User.id, user.id));

        return new Response(JSON.stringify(data), {
            headers: { "content-type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Ocurrio algo con tu plan por favor intentalo mas tarde" }), {
            headers: { "content-type": "application/json" },
            status: 500,
        });
    } finally {
        console.log("fetch finalizado")
    }
};