// Aqui hacemos la peticion a la api de ia para obtener la respuesta

import { AI_URL } from "@src/utils";

export class AiModel {
    async getPlanUnit() {
        const unitPlan = await fetch(`${AI_URL}/unit_plan`)
        const data = JSON.stringify(unitPlan)
        return data
    }
}