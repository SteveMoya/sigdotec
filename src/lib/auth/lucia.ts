import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db, Session, User } from "astro:db";
import { argon2id } from "argon2";
import jwt from "jsonwebtoken"
import { AUTH_SECRET, BASE_URL } from "@/utils";

const adapter = new DrizzleSQLiteAdapter(db as any, Session, User);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            // set to `true` when using HTTPS
            secure: import.meta.env.PROD,
        },
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            id: attributes.id,
            username: attributes.username,
            email: attributes.email,
            userimage: attributes.userimage,
            emailVerificated: attributes.emailVerificated,
            provider: attributes.provider,
            role: attributes.role,
            balance: attributes.balance,
        };
    },
});



declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}
interface DatabaseUserAttributes {
    id:string
    username: string;
    email: string;
    userimage: string;
    emailVerificated: boolean;
    provider: string;
    role: string;
    balance: number;
}

export async function createVerificationToken(email:string) {
    const code = Math.random().toString(36).substring(2, 8);
    const token = jwt.sign({
        email, code
    }, AUTH_SECRET, {
        expiresIn: "5m"
    })
    return token
} 


const url = `${BASE_URL}/auth/email-verification?token=${createVerificationToken("email")}`



export const passwordResetToken = lucia.createSession("email_reset", {
    expiresIn: 60 * 60,
});