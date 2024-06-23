import type { APIContext, APIRoute } from "astro";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { db, User } from "astro:db";
import { lucia } from "@src/lib/auth/lucia";
import { SignUpSchema } from "@/schemas/authentification";

export const POST:APIRoute = async(context: APIContext): Promise<Response> => {
    //Parse the form data
    const formData = await context.request.formData();

    const username = formData.get("username");
    const email = formData.get("email")
    const password = formData.get("password");
    //Validate the form data with zod
     try {
         SignUpSchema.parse({ username, password,email });
    } catch (error: any) {
        return new Response(error.message, { status: 400 });
    }
    // Insert user into db
    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password as string);

    await db.insert(User).values([
        {
            id: userId,
            username,
            email,
            hashedPassword,
        },
    ]);

    // Generate session
    const session = await lucia.createSession(userId, { expiresIn: 60 * 60 * 24 * 30, });
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
    return context.redirect("/");
}