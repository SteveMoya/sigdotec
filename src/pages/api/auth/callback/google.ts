import { lucia } from "@lib/auth/lucia";
import { generateCodeVerifier, OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { db, eq, User } from "astro:db";

import type { APIContext } from "astro";
import { google } from "@/lib/auth/providers";

export async function GET(context: APIContext): Promise<Response> {
    const code = context.url.searchParams.get("code");
    const state = context.url.searchParams.get("state");
    if (!code || !state ) {
        return new Response(null, {
            status: 400,
        });
    }
    
    const codeVerifier = context.cookies.get("codeVerifier")?.value;
    const savedState = context.cookies.get("state")?.value;

    if (!codeVerifier || !savedState) {
        return new Response(null, {
            status: 400,
        });
    }
    if(savedState !== state){
        return new Response(null, {
            status: 400,
        });
    }
    try {
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        const googleUserResponse = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        const googleUser: GoogleUser = await googleUserResponse.json();
        console.log(googleUser)
        // Replace this with your own DB client.
        //const existingUser = await db.table("user").where("google_id", "=", googleUser.id).get();
        const existingUser = (
            await db.select().from(User).where(eq(User.providerID, googleUser.sub))
        ).at(0);
        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {
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

        const userId = generateId(15);
        const provider = "google"
        // Replace this with your own DB client.
        await db.insert(User).values([
            {
                id: userId,
                providerID: googleUser.sub,
                username: googleUser.name,
                provider,
                email: googleUser.email,
                userimage: googleUser.picture,
                emailVerificated: true,
            },
        ]);

        const session = await lucia.createSession(userId, {
            expiresIn: 60 * 60 * 24 * 30,
        });
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
        return context.redirect("/app/");
    } catch (e) {
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
}

interface GoogleUser {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
    email?: string;
    email_verified?: boolean;
    hd?: string;
}