import { lucia } from "@lib/auth/lucia";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { db, eq, User } from "astro:db";

import type { APIContext } from "astro";
import { facebook } from "@/lib/auth/providers";

export async function GET(context: APIContext): Promise<Response> {
    const code = context.url.searchParams.get("code");
    
    const storedState = context.cookies.get("facebook_oauth_state")?.value ?? null;
    if (!code ||  !storedState ) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = await facebook.validateAuthorizationCode(code);
        const facebookUserResponse = await fetch(`https://graph.facebook.com/me?access_token=${tokens.accessToken}&fields=id,name,email,picture`, {
        });
        const facebookUser: FacebookUser = await facebookUserResponse.json();
        // Replace this with your own DB client.
        //const existingUser = await db.table("user").where("facebook_id", "=", facebookUser.id).get();
        console.log(facebookUser)
        const existingUser = (
            await db.select().from(User).where(eq(User.providerID, facebookUser.id))
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
        const provider = "facebook"
        // Replace this with your own DB client.
        await db.insert(User).values([
            {
                id: userId,
                providerID: facebookUser.id,
                username: facebookUser.name,
                provider,
                email: facebookUser.email,
                userimage: facebookUser.picture.data.url,
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
        return context.redirect("/auth/datos-demograficos");
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

interface FacebookUser {
    id: string;
    name: string;
    email?: string;
    picture: {
        data: {
            height: number;
            is_silhouette: boolean;
            url: string;
            width: number;
        };
    };
}