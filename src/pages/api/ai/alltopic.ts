import type { APIContext, APIRoute } from "astro";
import allTopicMock from "@mocks/allDataMock.json"
import { PlanService } from "@services/plans.services";

export async function GET(context: APIContext): Promise<Response> {
    const data = allTopicMock
    const user = context.locals.user;
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }
    try {
        // const data = await PlanService.getAllTopcis()
        
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