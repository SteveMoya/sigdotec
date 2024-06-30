import { lucia } from "@lib/auth/lucia";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { db, eq, User } from "astro:db";

import type { APIContext } from "astro";
import { github } from "@/lib/auth/providers";

export async function GET(context: APIContext): Promise<Response> {
    const code = context.url.searchParams.get("code");
    const state = context.url.searchParams.get("state");
    const storedState = context.cookies.get("github_oauth_state")?.value ?? null;
    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        const githubUser: GitHubUser = await githubUserResponse.json();
        // Replace this with your own DB client.
        //const existingUser = await db.table("user").where("github_id", "=", githubUser.id).get();
        const existingUser = (
            await db.select().from(User).where(eq(User.providerID, githubUser.id))
        ).at(0);

        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            context.cookies.set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
            return context.redirect("/app/");
        }

        const userId = generateId(15);
        const provider = "github"
        // Replace this with your own DB client.
        await db.insert(User).values([
            {
                id: userId,
                providerID: githubUser.id,
                username: githubUser.login,
                provider, 
                email: githubUser.email,
                userimage: githubUser.avatar_url,
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

interface GitHubUser {
    id: string;
    login: string;
    avatar_url: string;
    email: string;
}