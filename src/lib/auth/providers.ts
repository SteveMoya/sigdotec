import { Facebook, GitHub, Google, generateCodeVerifier, generateState } from "arctic";
import { APP_URL, BASE_URL, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@src/utils";

export const github = new GitHub(
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET
);

export const google = new Google(
    GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET!,
    // Aqui colocamos que si esta en desarrollo utilice el local host y si no utilice el dominio
    APP_URL + 'api/auth/callback/google'
);

export const createGoogleAuthorizationURL = async () => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const authorizationURL = await google.createAuthorizationURL(state, codeVerifier,{
        scopes: ["email", "profile"]
    });
    return { state, codeVerifier, authorizationURL };
}


export const facebook = new Facebook(
    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET,
    // Aqui colocamos que si esta en desarrollo utilice el local host y si no utilice el dominio
    `${BASE_URL}/api/auth/callback/facebook/`
)