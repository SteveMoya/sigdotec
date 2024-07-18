import type { APIContext } from "astro";

import { PlanService } from "@services/plans.services";

export async function POST(context: APIContext): Promise<Response> {
    
    const user = context.locals.user;
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }
    
    try {
        const doxURL = await PlanService.getPlanDOX(user.id);
        console.log("URL de la descarga",doxURL)
        const response = await fetch(doxURL?.url ?? '');
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
       
        // Aqui actualizamos el balance del usuario
        
        return new Response(buffer, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': `attachment; filename="plan.doc"`,
            },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Ocurrio algo con tu plan por favor intentalo mas tarde" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    } finally {
        console.log("fetch finalizado")
    }
};