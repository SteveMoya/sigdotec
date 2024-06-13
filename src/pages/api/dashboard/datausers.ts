import type { Role } from "@src/schemas";
import { getUser } from "@src/services/dashboard.services";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
    const role: Role["role"] = cookies.get("authjs.role")?.value as "admin" | "user" | "school";
    if (!role) {
        return new Response(JSON.stringify({ error: "No tienes ningun rol asignado" }), { status: 401 })
    }    
    if (role !== "admin") {
        return new Response(JSON.stringify({ error: "Necesitas ser usuario administrador" }), { status: 403 })
    }
    const data = await getUser();

    return new Response(JSON.stringify(data), { status: 200 });
}