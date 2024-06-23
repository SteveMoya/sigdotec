import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db, Session, User } from "astro:db";


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
    username: string;
    email: string;
    userimage: string;
    emailVerificated: boolean;
    provider: string;
    role: string;
    balance: number;
}