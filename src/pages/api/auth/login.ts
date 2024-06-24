
// import { SignInSchema } from "@/schemas/authentification";
// import { lucia } from "@src/lib/auth/lucia";
// import type { APIContext } from "astro";
// import { db, eq, User } from "astro:db";
// import { Argon2id } from "oslo/password";
// export async function POST(context: APIContext): Promise<Response> {
//     //read the form data
//     const formData = await context.request.formData();
//     const username = formData.get("username");
//     const password = formData.get("password");
//     //validate the data with z
//     try {
//         SignInSchema.parse({ username, password });
//     } catch (error: any) {
//         return new Response(error.message, { status: 400 });
//     }

//     //search the user
//     const foundUser = (
//         await db.select().from(User).where(eq(User.username, username as string))
//     ).at(0);

//     //if user not found
//     if (!foundUser) {
//         return new Response("Incorrect username or password", { status: 400 });
//     }

//     // verify if user has password
//     if (!foundUser.hashedPassword) {
//         return new Response("Invalid password", {
//             status: 400,
//         });
//     }

//     const validPassword = await new Argon2id().verify(
//         foundUser.hashedPassword,
//         password as string
//     );

//     //If password is not valid
//     if (!validPassword) {
//         return new Response("Incorrect username or password", { status: 400 });
//     }

//     //Password is valid, user can log in

//     const session = await lucia.createSession(foundUser.id, {expiresIn: 60 * 60 * 24 * 30,});
//     const sessionCookie = lucia.createSessionCookie(session.id);
//     context.cookies.set(
//         sessionCookie.name,
//         sessionCookie.value,
//         sessionCookie.attributes
//     );
//     return context.redirect("/app/");
// }