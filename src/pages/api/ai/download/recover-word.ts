import type { APIContext } from "astro";

import { PlanService } from "@services/plans.services";

export async function POST(context: APIContext): Promise<Response> {

    const user = context.locals.user;
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }
    const body = await context.request.json();
    const { planID } = body;
    console.log("PlanID", planID)
    if(!planID || typeof planID !== 'string' || planID.length === 0 || planID.length > 100) {
        return new Response(JSON.stringify({ error: "Peticion incorrecta" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400,
        });
    }
    try {
        const buffer = await PlanService.getRecoverWord(planID)

        return new Response(buffer, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': `attachment; filename="plan.docx"`,
            },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Ocurrio algo con tu plan por favor intentalo mas tarde" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
};