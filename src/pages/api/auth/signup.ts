import type { APIContext } from "astro";
import { generateId } from "lucia";
import { db, eq, User } from "astro:db";
import { lucia } from "@/lib/auth/lucia";
import argon2id from 'argon2'
// import { SignUpSchema } from "@/schemas/authentification";
export async function POST(context: APIContext): Promise<Response> {
  const body = await context.request.json();
  if (body === null) {
    return new Response("Invalid request", {
      status: 400,
    });
  }
  const { username, email, password } = body;

  if (!username || !password || !email) {
    return new Response("Invalid request", { status: 400 });
  }
  if (typeof username !== "string" || username.length < 4) {
    return new Response("El nombre de usuario tiene que tener por lo menos 4 caracteres", {
      status: 400,
    });
  }
  if(typeof email !== "string" || email.length < 6){
    return new Response("El correo electronico tiene que tener un minimo de 6 caracteres", { status : 400})
  }
  if (typeof password !== "string" || password.length < 4) {
    return new Response("La contraseña tiene que tener por lo menos 4 caracteres", {
      status: 400,
    });
  }
  const foundUser = (
    await db.select().from(User).where(eq(User.email, email))
  ).at(0);
  if (foundUser) {
    return new Response("El correo electronico ya esta en uso", {
      status: 400,
    });
  }
  // Insert user into db
  const userId = generateId(15);
  const hashedPassword = await argon2id.hash(password);
  await db.insert(User).values([
    {
      id: userId,
      username,
      email,
      hashedPassword,
    },
  ]);

  // Generate session
  const session = await lucia.createSession(userId, {
    expiresIn: 60 * 60 * 24 * 30,
  });
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  console.log(context.locals.user)
  return context.redirect("/auth/email-verification");
}
