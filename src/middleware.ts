
import { defineMiddleware } from "astro:middleware"

import { verifyRequestOrigin } from "lucia"
import { lucia } from "./lib/auth/lucia";
const protectedRoutesPrefix = "/app/";
const redirectRoutes = ["/login", "/register"];
const adminRoutes = "/admin/";
const verificationRoute = "/auth/email-verification/"

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.request.method !== "GET") {
    const originHeader = context.request.headers.get("Origin");
    const hostHeader = context.request.headers.get("Host");
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    )
    {
      return new Response(null, {
        status: 403,
      });
    }
  }

  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
  if(context.url.pathname.startsWith(adminRoutes) || context.url.pathname.startsWith(protectedRoutesPrefix)){
    if (!sessionId) {
      return context.redirect(redirectRoutes[0]);
    }
   }
  if(context.url.pathname.startsWith(redirectRoutes[0]||redirectRoutes[1])){
    if (sessionId) {
      return context.redirect(protectedRoutesPrefix);
    }
  }
  if (!sessionId) {
    context.locals.user = null;
    context.locals.session = null;
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
  context.locals.session = session;
  context.locals.user = user;
  const role = user?.role;
  if (context.url.pathname.startsWith(verificationRoute)) {
        if (user?.emailVerificated) {
          return context.redirect(protectedRoutesPrefix);
        }
      }
    
    if (context.url.pathname.startsWith(protectedRoutesPrefix) || context.url.pathname.startsWith(adminRoutes)){
      if (!user?.emailVerificated) {
        return context.redirect(verificationRoute);
      }
    }
    if(context.url.pathname.startsWith(protectedRoutesPrefix)){
      if (role === "admin") {
        return context.redirect(adminRoutes);
      }
    }
    if(context.url.pathname.startsWith(adminRoutes)){
      if (role === "user") {
        return context.redirect(protectedRoutesPrefix);
      }
    }
  return next();
});





