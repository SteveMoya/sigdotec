
import { lucia } from "@/lib/auth/lucia";
import type { APIContext } from "astro";
import { db, Demographic, eq, User } from "astro:db";
// import { Argon2id } from "oslo/password";
import argon2id from 'argon2'

export async function POST(context: APIContext): Promise<Response> {
  const body = await context.request.json();
  if (body === null) {
    return new Response("Invalid request body", {
      status: 400,
    });
  }
  const { username, password } = body;

  if (typeof username !== "string") {
    return new Response("Invalid username", {
      status: 400,
    });
  }
  if (typeof password !== "string") {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  //search the user
  const foundUser = (
    await db.select().from(User).where(eq(User.username, username))
  ).at(0);

  //if user not found
  if (!foundUser) {
    return new Response("Incorrect username or password", { status: 400 });
  }

  // verify if user has password
  if (!foundUser.hashedPassword) {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  const validPassword = await argon2id.verify(
    foundUser.hashedPassword,
    password
  )

  //If password is not valid
  if (!validPassword) {
    return new Response("Incorrect username or password", { status: 400 });
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
  const DemographicUser = (
    await db.select().from(Demographic).where(eq(Demographic.userId, foundUser.id))
  ).at(0);
  if (DemographicUser) {
    return context.redirect("/auth/datos-demograficos");
  }
  return context.redirect("/app/");
}
