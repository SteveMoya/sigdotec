import { createVerificationToken } from "@/lib/auth/lucia";
import { sendResetPasswordEmail } from "@/lib/email/sendEmail";
import type { APIContext } from "astro";
import { eq, db, User } from "astro:db";


export async function POST(context: APIContext): Promise<Response> {
    const body = await context.request.json();
    if (body === null) {
        return new Response("Invalid request body", {
            status: 400,
        });
    }
    console.log("Este es el body", body)
    const { email } = body;
    const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const emailvalid = emailregex.test(email);
    if (!emailvalid) {
        return new Response("Invalid email", { status: 400 });
    }
    console.log("Este es el email", email)
    const token = await createVerificationToken(email);
    const user = (await db.select().from(User).where(eq(User.email, email))).at(
        0,
    );
    if (!user) {
        return new Response(JSON.stringify({ error: "Usuario no existe" }), { status: 404 });
    }
    const username = user.username;

    try {
        await sendResetPasswordEmail(username, token.toString(), email);
        return new Response("Email enviado", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Error al enviar tu email de Verificación por favor intentalo mas tarde" }), { status: 500 });
    }
    
}