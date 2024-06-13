/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
// interface ImportMetaEnv {
//   readonly API_AI_URL: string
//   readonly API_USER_URL: string

//   readonly FIREBASE_PRIVATE_KEY_ID: string
//   readonly FIREBASE_PRIVATE_KEY: string
//   readonly FIREBASE_PROJECT_ID: string
//   readonly FIREBASE_CLIENT_EMAIL: string
//   readonly FIREBASE_CLIENT_ID: string
//   readonly FIREBASE_AUTH_URI: string
//   readonly FIREBASE_TOKEN_URI: string
//   readonly FIREBASE_AUTH_CERT_URL: string
//   readonly FIREBASE_CLIENT_CERT_URL: string

//   // más variables de entorno...
// }

interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_ANON_KEY: string

   GITHUB_CLIENT_ID: string
   GITHUB_CLIENT_SECRET: string

   FACEBOOK_CLIENT_ID: string
   FACEBOOK_CLIENT_SECRET: string

   GOOGLE_CLIENT_ID: string
   GOOGLE_CLIENT_SECRET: string

   AUTH_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare namespace App {
  interface Locals {
    email: string;
    username: string;
    userimage: string;
  }
}