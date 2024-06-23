import type { APIRoute } from "astro";

import classplanmock from '@mocks/classplan.json';
import { PlanService } from "@services/plans.services";
import { CLASS_PRICE } from "@src/utils";

export const POST: APIRoute = async ({ request, cookies }) => {
    const data = classplanmock;
    
    const body = await request.json(); 
    const amount = Number(cookies.get("authjs.amount")?.value).toFixed(2)
    if (!amount) {
        return new Response(JSON.stringify({ error: "Amount es requerido" }), {
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
    try {
        // const data = await PlanService.getPlanClass(body);
        const newAmount = Number(amount) - CLASS_PRICE;
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
        return new Response(JSON.stringify({ error: "Ocurrio algo con tu plan por favor intentalo mas tarde" }), {
            headers: { "content-type": "application/json" },
            status: 500,
        });
    } finally {
        console.log("fetch finalizado")
    }
};