import type { APIContext } from "astro";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { db, User } from "astro:db";
import { lucia } from "@/lib/auth/lucia";
import { SignUpSchema } from "@/schemas/authentification";
export async function POST(context: APIContext): Promise<Response> {
  //Parse the form data
  const formData = await context.request.formData();
  const username = formData.get("username");
  const email = formData.get("email")
  const password = formData.get("password");
  //Validate the form data

  if (!username || !password || !email) {
    return new Response("Invalid request", { status: 400 });
  }
  if (typeof username !== "string" || username.length < 4) {
    return new Response("Username must be at least 4 characters long", {
      status: 400,
    });
  }
  if(typeof email !== "string" || email.length < 6){
    return new Response("Email must be at least 6 characters long", { status : 400})
  }
  if (typeof password !== "string" || password.length < 4) {
    return new Response("Password must be at least 4 characters long", {
      status: 400,
    });
  }
  // Insert user into db
  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);

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
  return context.redirect("/app/");
}
