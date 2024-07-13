import { verifyToken } from "@/lib/auth/lucia";
import { AUTH_SECRET } from "@/utils";
import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";

export async function GET(context: APIContext): Promise<Response> {
  const tokenParams = context.params.token ?? "";
  if (!tokenParams) {
    return new Response("Token inválido o ya expirado", {status: 400})
  }
  const validateToken = await verifyToken(tokenParams) as {
    email: string
    code: string
  } ;
    if (!validateToken) {
        return new Response("Token inválido o ya expirado", {status: 400})
    }
    const email = validateToken.email as string;
    try{
      const emailVerficationQuery = await db.update(User).set({ emailVerificated: true }).where(eq(User.email, email));
      console.log("se actualiza el email")
      if (!emailVerficationQuery) {
        return new Response("Token Invalido", {
          status: 400
        })
      }
      return new Response(null, {
        status: 302,
        headers: {
          location: "/app/",
        },
      });
    }catch(error){
      console.log(error);
      return new Response("Token inválido o ya expirado", { status: 404 })
    }
}

