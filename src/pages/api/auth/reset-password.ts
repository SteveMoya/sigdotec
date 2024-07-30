import type { APIContext } from "astro";
import { verifyToken } from "@/lib/auth/lucia";
import { db, eq, User, Session } from "astro:db";
import { hasherPassword } from "@/utils";
import { lucia } from "@/lib/auth/lucia";

export async function POST(context: APIContext): Promise<Response> {
    const body = await context.request.json();
    console.log("Este es el body", body);

    const { newPassword, confirmPassword, token } = body;
    if (!token || !newPassword || !confirmPassword || newPassword !== confirmPassword) {
        return new Response(
            JSON.stringify({ error: "Faltan campos por completar" }),
            {
                headers: { "content-type": "application/json" },
                status: 400,
            },
        );
    }
    if (
        newPassword instanceof File ||
        newPassword === null ||
        newPassword.length < 8
    ) {
        return new Response("Contraseña invalida", { status: 400 });
    }

    try {
        const decodedToken = (await verifyToken(token ?? "")) as {
            email: string;
            code: string;
        };
        const email = decodedToken.email;
        console.log("Este es el email", email);
        const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const emailvalid = emailregex.test(email);
        if (!emailvalid) {
            return new Response("Invalid email", { status: 400 });
        }
        const existedUser = (
            await db.select().from(User).where(eq(User.email, email))
        ).at(0);
        if (!existedUser) {
            return new Response("Usuario no encontrado", { status: 404 });
        }
        const newHashPassword = await hasherPassword(newPassword);
        await db
            .update(User)
            .set({
                hashedPassword: newHashPassword,
            })
            .where(eq(User.id, existedUser.id));

        await db.delete(Session).where(eq(Session.userId, existedUser.id));

        const session = await lucia.createSession(existedUser.id, {
            expiresIn: 60 * 60 * 24 * 30,
        });
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
        console.log("Este es el usuario", existedUser);
        return context.redirect("/app/");
    } catch (e) {
        console.log(e);
        return new Response("Error interno del servidor", { status: 500 });
    }
}