
import { createGoogleAuthorizationURL, google } from "@/lib/auth/providers";
import { generateCodeVerifier, generateState } from "arctic";



import type { APIContext } from "astro";

export async function GET(context: APIContext): Promise<Response> {
  try {
    // const { state, codeVerifier, authorizationURL } = await createGoogleAuthorizationURL()
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const authorizationURL = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["email", "profile"]
    });
    context.cookies.set("state", state, {
      secure: import.meta.env.PROD,
      httpOnly: true,
      sameSite: "lax",
      path: "/"
    })
  
    context.cookies.set("codeVerifier", codeVerifier, {
      secure: import.meta.env.PROD,
      httpOnly: true,
      sameSite: "lax",
      
      path: "/"
    });
  
    return context.redirect(authorizationURL.toString());
  } catch (error) {
    return new Response(null, {
      status: 500,
    });
  }
}