/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
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
    session: import("lucia").Session | null;
    user: import("lucia").User | null;

  }
}