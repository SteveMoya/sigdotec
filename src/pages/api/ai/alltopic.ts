import type { APIContext } from "astro";
import NodeCache from "node-cache";
import allTopicMock from "@mocks/allDataMock.json"
import { PlanService } from "@services/plans.services";

// Configuración de la caché con un TTL de 5 minutos (300 segundos)
const cache = new NodeCache({ stdTTL: 300 });

export async function GET(context: APIContext): Promise<Response> {
    const user = context.locals.user;
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    // Intentar obtener los datos de la caché
    let data = cache.get("allTopics");

    if (!data) {
        console.log("Datos no encontrados en caché, obteniendo de la API");
        try {
            // Si no están en la caché, obtener los datos de la API
            data = await PlanService.getAllTopcis();

            // Almacenar los datos en la caché
            cache.set("allTopics", data);
        } catch (error) {
            console.error("Error al obtener datos:", error);
            return new Response(JSON.stringify({ error: "Ocurrió algo con tu plan, por favor inténtalo más tarde" }), {
                headers: { "content-type": "application/json" },
                status: 500,
            });
        }
    } else {
        console.log("Usando datos de caché");
    }

    return new Response(JSON.stringify(data), {
        headers: { "content-type": "application/json" },
        status: 200,
    });
};
