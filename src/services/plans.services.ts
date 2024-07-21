import type { PlanBaseSchema, PlanClassSchema, ErrorSchema } from "@src/schemas";
import { AI_URL } from "@src/utils";
import dataTableMock from "@mocks/dataTableMock.json";
import type {Plan} from "@/components/DataTable/Plan"
import { AI_API_SECRET } from "@src/utils";

export const PlanService = {
    async getPlanUnit(topic_id: number, username: string, userid: string) {
        try {
            const unitPlan = await fetch(`${AI_URL}unit_plan`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${AI_API_SECRET}`,
                },
                body: JSON.stringify({ topic_id, username, userid})
            });
            
            console.log(unitPlan)
            const data: PlanBaseSchema = await unitPlan.json();
            console.log(data)
            return data;
        }
        catch (error) {
            console.log(error);
        }
    },
    async getAllTopcis() {
        try {
            const allTopics = await fetch(`${import.meta.env.AI_URL}/all_topic_id`,{
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${AI_API_SECRET}`,
                }
            });
            const data = allTopics.json();
            console.log(data)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async getPlanClass(id: number[], username: string, userid: string) {
    
        try {
            const classPlan = await fetch(`${AI_URL}class_plan`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${AI_API_SECRET}`,
                },
                body: JSON.stringify({
                    username,
                    userid,
                    subtopic: id.map(Number),
                })
            });
            const data: PlanClassSchema = await classPlan.json();
            console.log(data)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async getClassPlanEmbedding(username:string, userid:string, text_input:string, id_subject: number, id_grade: number) {
        try {
            const embeddingPlan = await fetch(`${AI_URL}class_plan_embedding`, {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${AI_API_SECRET}`,
                },
                body: JSON.stringify({
                    username,
                    userid,
                    text_input,
                    id_subject,
                    id_grade
                })
            });
            const data = await embeddingPlan.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    ,
    async getPlanDOX(userID: string) {
        try {
            const doxPlan = await fetch(`${import.meta.env.AI_URL}/download/${userID}`,{
                method: 'GET',
                headers: {
                    'Authorization': `${AI_API_SECRET}`
                }
            });
            if (!doxPlan.ok) {
                throw new Error('Error fetching the document');
            }
            console.log("Peticion de la api",doxPlan)
            // cogeremos el archivo que esta dentro de la url y lo devolveremos
            return doxPlan
        } catch (error) {
            console.log(error);
        }
    },
    async getAnualPlan(id_subject:number, id_grade: number){
        console.log("Id de la materia",id_subject)
        console.log("Id del grado",id_grade)
        try {
            const anualPlan = await fetch(`${import.meta.env.AI_URL}/download/annual_plan/${id_subject}${id_grade}`,{
                method: 'GET',
                headers: {
                    'Authorization': `${AI_API_SECRET}`,
                }
            });
            console.log("URL de la peticion",anualPlan.url)
            if (!anualPlan.ok) {
                throw new Error('Error fetching the document');
            }
            console.log("Peticion de la api",anualPlan)
            // cogeremos el archivo que esta dentro de la url y lo devolveremos
            return anualPlan
        } catch (error) {
            console.log(error);
        }
    },
    async getDataTable(): Promise<Plan[]>{
        return dataTableMock as Plan[];
    }
}
