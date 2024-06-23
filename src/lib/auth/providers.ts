import { Facebook, GitHub, Google } from "arctic";
import { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@src/utils";

export const github = new GitHub(
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET
);

export const google = new Google(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    // Aqui colocamos que si esta en desarrollo utilice el local host y si no utilice el dominio
    import.meta.env.DEV ? "http://localhost:4321/api/auth/google/callback" : "https://sigdotec.com/api/auth/google/callback"
);

export const facebook = new Facebook(
    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET,
    // Aqui colocamos que si esta en desarrollo utilice el local host y si no utilice el dominio
    import.meta.env.DEV ? "http://localhost:4321/api/auth/facebook/callback" : "https://sigdotec.com/api/auth/facebook/callback"
)