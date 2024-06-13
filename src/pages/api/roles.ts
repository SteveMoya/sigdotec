import type { Role } from "@src/schemas";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
    const role: Role["role"] = cookies.get("authjs.role")?.value as "admin" | "user" | "school";
    
    cookies.set("authjs.role", "admin", {
        sameSite: "strict",
        path: "/",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        });

    return redirect("/admin")
}