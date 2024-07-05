import type { APIContext, APIRoute } from "astro";
import type {  PlanBaseSchema } from "@schemas/plans";
import dataMock  from "@mocks/unitPlanMock.json"
// import { PlanService } from "@services/plans.services";
import { UNIT_PRICE } from "@src/utils";
import { db, eq, User } from "astro:db";


export async function GET(context: APIContext): Promise<Response> {
    const data: PlanBaseSchema = dataMock
    const user = context.locals.user;
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }
    const topic_id = Number(context.url.searchParams.get("topic_id"))
    if (!topic_id) {
        return new Response(JSON.stringify({error: "Tema requerido es requerido"}), {
            headers: { "content-type": "application/json" },
            status: 400,
        });
    }
    const amount = user.balance;
    
    if (Number(amount) < UNIT_PRICE) {
        return new Response(JSON.stringify({ error: "No existe suficiente Dinero en tu cartera para poder tener tu plan, ve a cartera y deposita el dinero suficiente"}), {
            headers: { "content-type": "application/json" },
            status: 400,
        });
    }
    
        try{
            // const data = await PlanService.getPlanUnit(topic_id)
            // Aqui actualizamos el balance del usuario
            await db.update(User).set({ balance: (Number(amount) - UNIT_PRICE) }).where(eq(User.id, user.id));
            console.log(data)
             return new Response(JSON.stringify(data), {
            headers: { "content-type": "application/json" },
            status: 200,
        });
        } catch (error) {
            return new Response(JSON.stringify({error: "Ocurrio algo con tu plan por favor intentalo mas tarde"}), {
                headers: { 'Content-Type': 'application/json' },
                status: 500,
            });
        } finally {
            console.log("fetch finalizado")
        }
};