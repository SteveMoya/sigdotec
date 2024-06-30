
import { createGoogleAuthorizationURL, google } from "@/lib/auth/providers";



import type { APIContext } from "astro";

export async function GET(context: APIContext): Promise<Response> {
  try {
    const { state, codeVerifier, authorizationURL } = await createGoogleAuthorizationURL()
    context.cookies.set("state", state, {
      secure: import.meta.env.PROD,
      httpOnly: true,
      sameSite: "strict",
    })
  
    context.cookies.set("codeVerifier", codeVerifier, {
      secure: import.meta.env.PROD,
      httpOnly: true,
      sameSite: "strict",
    });
  
    return context.redirect(authorizationURL.toString());
  } catch (error) {
    return new Response(null, {
      status: 500,
    });
  }
}