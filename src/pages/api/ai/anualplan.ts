import type { APIContext, APIRoute } from "astro";
import { PlanService } from "@services/plans.services";
import { ANUAL_PRICE } from "@src/utils";
import { db, eq, User } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
    const user = context.locals.user;
    if (!user) {
        return new Response("Usuario no authenticado", { status: 401 });
    }

    const amount = user.balance;
    if (!amount) {
        return new Response(JSON.stringify({ error: "Balance requerido" }), {
            headers: { "content-type": "application/json" },
            status: 400,
        });
    }
    if (Number(amount) < ANUAL_PRICE) {
        return new Response(JSON.stringify({ error: "No existe suficiente Dinero en tu cartera para poder tener tu plan, ve a cartera y deposita el dinero suficiente" }), {
            headers: { "content-type": "application/json" },
            status: 400,
        });
    }
    const body = await context.request.json();
    // luego aqui convertimos el array de string en un array de numeros
    console.log("Esta es la peticion del usuario", body);
    const { materia, grado } = body;
    if (!materia || !grado) {
        return new Response(JSON.stringify({ error: "Materia y grado requerido" }), {
            headers: { "content-type": "application/json" },
            status: 400,
        });
    }
    if (Number(materia) < 1 || Number(grado) < 1) {
        return new Response(JSON.stringify({ error: "Materia y grado deben ser mayores a 0" }), {
            headers: { "content-type": "application/json" },
            status: 400,
        });
    }
    try {
        const data = await PlanService.getAnualPlan(Number(materia), Number(grado));
        console.log("Estos son los datos que se van a guardar", data);
        const response = await fetch(data?.url ?? '');
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // Aqui actualizamos el balance del usuario
        await db.update(User).set({ balance: (Number(amount) - ANUAL_PRICE) }).where(eq(User.id, user.id));

        return new Response(buffer, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': `attachment; filename="plan-anual.zip"`,
            },
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