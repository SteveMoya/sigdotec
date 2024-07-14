
import { lucia } from "@/lib/auth/lucia";
import type { APIContext } from "astro";
import { db, Demography, eq, User } from "astro:db";
// import { Argon2id } from "oslo/password";
import argon2id from 'argon2'

export async function POST(context: APIContext): Promise<Response> {
  const body = await context.request.json();
  if (body === null) {
    return new Response("Invalid request body", {
      status: 400,
    });
  }
  const { email, password } = body;

  if (typeof email !== "string") {
    return new Response("Correo Invalido", {
      status: 400,
    });
  }
  if (typeof password !== "string") {
    return new Response("Contraseña Invalida", {
      status: 400,
    });
  }

  //search the user
  const foundUser = (
    await db.select().from(User).where(eq(User.email, email))
  ).at(0);

  //if user not found
  if (!foundUser) {
    return new Response("Correo o contraseña Incorrecta", { status: 400 });
  }

  // verify if user has password
  if (!foundUser.hashedPassword) {
    return new Response("Correo o contraseña Incorrecta", {
      status: 400,
    });
  }

  const validPassword = await argon2id.verify(
    foundUser.hashedPassword,
    password
  )

  //If password is not valid
  if (!validPassword) {
    return new Response("Correo o contraseña Incorrecta", { status: 400 });
  }

  //Password is valid, user can log in

  const session = await lucia.createSession(foundUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  });
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return context.redirect("/app/");
}
