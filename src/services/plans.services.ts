import type { PlanBaseSchema, PlanClassSchema, ErrorSchema } from "@src/schemas";
import { AI_URL, AI_API_SECRET, isDev } from "@src/utils";
import dataTableMock from "@mocks/dataTableMock.json";
import allDataMock from "@mocks/allDataMock.json";
import type {Plan} from "@/components/Tables/DataTable/Plan"


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
            
            const data = await unitPlan.json();
            console.log(data)
            
            return data;
        }
        catch (error) {
            console.log(error);
        }
    },
    async getAllTopcis() {
        // Cachear esto por 2 minutos
        if (isDev) {
            return allDataMock;
        }
        try {
            const allTopics = await fetch(`${import.meta.env.AI_URL}all_topic_id`,{
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${AI_API_SECRET}`,
                }
            });
            console.log(allTopics)
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
            const doxPlan = await fetch(`${import.meta.env.AI_URL}download/word/${userID}`,{
                method: 'GET',
                headers: {
                    'Authorization': `${AI_API_SECRET}`
                }
            });
            // cogeremos el archivo que esta dentro de la url y lo devolveremos
            // const response = await fetch(doxPlan?.url ?? '');
            const blob = await doxPlan.blob();
            const arrayBuffer = await blob.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            return buffer
        } catch (error) {
            console.log(error);
        }
    },
    async getPlanPDF(userID: string) {
        try {
            console.log("ID del usuario",userID)
            console.log("URL de la peticion",`${import.meta.env.AI_URL}/download/pdf/${userID}`)
            const pdfPlan = await fetch(`${import.meta.env.AI_URL}download/pdf/${userID}`,{
                method: 'GET',
                headers: {
                    'Authorization': `${AI_API_SECRET}`
                }
            });
            // if (!pdfPlan.ok) {
            //     throw new Error('Error fetching the document');
            // }
            // cogeremos el archivo que esta dentro de la url y lo devolveremos
            return pdfPlan
        } catch (error) {
            console.log(error);
        }
    },
    async getRecoverWord(planID: string) {
        try {
            const recoverWord = await fetch(`${import.meta.env.AI_URL}recover/download/${planID}`,{
                method: 'GET',
                headers: {
                    'Authorization': `${AI_API_SECRET}`
                }
            });
            
            
            // cogeremos el archivo que esta dentro de la url y lo devolveremos
            const blob = await recoverWord.blob();
            const arrayBuffer = await blob.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            return buffer
        } catch (error) {
            console.log(error);
        }
    },
    async getRecoverPDF(planID: string) {
        try {
            const recoverPDF = await fetch(`${import.meta.env.AI_URL}recover/download/pdf/${planID}`,{
                method: 'GET',
                headers: {
                    'Authorization': `${AI_API_SECRET}`
                }
            });
            console.log("Peticion de la api",recoverPDF)
            // cogeremos el archivo que esta dentro de la url y lo devolveremos
            return recoverPDF
        } catch (error) {
            console.log(error);
        }
    },
    async getAnualPlan(id_subject:number, id_grade: number){
        console.log("Id de la materia",id_subject)
        console.log("Id del grado",id_grade)
        try {
            const anualPlan = await fetch(`${import.meta.env.AI_URL}/download/annual_plan/${id_subject}/${id_grade}`,{
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
    async getDataTable(userID: string): Promise<Plan[]>{
        // return dataTableMock as Plan[];
        if (isDev) {
            const res = await fetch(`${import.meta.env.AI_URL}recover/test`, {
                method: 'GET',
                headers: {
                    'Authorization': `${AI_API_SECRET}`
                }
            });
            const data: Plan[] = await res.json();
            console.log(data)
            return data;
        }
        try {
            const res = await fetch(`${import.meta.env.AI_URL}recover/${userID}`,{
                method: 'GET',
                headers: {
                    'Authorization': `${AI_API_SECRET}`
                }
            });
            const data:Plan[] = await res.json();
            console.log(data)
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
