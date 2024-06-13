import type { APIRoute } from "astro";
import allTopicMock from "@mocks/allDataMock.json"
import { PlanService } from "@services/plans.services";

export const GET: APIRoute = async ({ cookies }) => {
    const data = allTopicMock

    const amount = Number(cookies.get("authjs.amount")?.value).toFixed(2)
    if (!amount) {
        return new Response(JSON.stringify({ error: "Amount es requerido" }), {
            headers: { "content-type": "application/json" },
            status: 400,
        });
    }
    try {
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
        console.log("fetch de todos los temas finalizado")
    }
};