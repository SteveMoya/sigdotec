import type { APIRoute } from "astro";
import type {  PlanBaseSchema } from "@schemas/plans";
import dataMock  from "@mocks/unitPlanMock.json"
// import { PlanService } from "@services/plans.services";
import { UNIT_PRICE } from "@src/utils";


export const GET: APIRoute = async ({  url, cookies }) => {
    const data: PlanBaseSchema = dataMock
    const topic_id = Number(url.searchParams.get("topic_id"))
    if (!topic_id) {
        return new Response(JSON.stringify({error: "Tema requerido es requerido"}), {
            headers: { "content-type": "application/json" },
            status: 400,
        });
    }
    
    const amount = Number(cookies.get("authjs.amount")?.value).toFixed(2)
    if (!amount) {
        return new Response(JSON.stringify({error: "Amount es requerido"}), {
            headers: { "content-type": "application/json" },
            status: 400,
        });
    }
    if (Number(amount) < UNIT_PRICE) {
        return new Response(JSON.stringify({ error: "No existe suficiente Dinero en tu cartera para poder tener tu plan, ve a cartera y deposita el dinero suficiente"}), {
            headers: { "content-type": "application/json" },
            status: 400,
        });
    }
    
        try{
            // const data = await PlanService.getPlanUnit(topic_id)
            console.log(data)
            const newAmount = Number(amount) - UNIT_PRICE
            cookies.set("authjs.amount", newAmount.toFixed(2), {
                sameSite: "strict",
                path: "/",
                secure: true,
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
            });
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