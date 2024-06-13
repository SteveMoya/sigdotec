import { type Role } from "@src/schemas";
import { uuidv4 } from "@src/utils";
import { defineMiddleware } from "astro:middleware";

const protectedRoutesPrefix = "/app/";
const redirectRoutes = ["/login", "/register"];
const adminRoutes = "/admin";


export const onRequest = defineMiddleware(
async ({ locals, url, cookies, redirect }, next) => {
    const sessionToken = cookies.get("authjs.session-token")?.value || cookies.get("__Secure-authjs.session-token")?.value
    const csrfToken = cookies.get("authjs.csrf-token")?.value || cookies.get("__Host-authjs.csrf-token")?.value;
    
    const role: Role["role"] = cookies.get("authjs.role")?.value as "admin" | "user" | "school";
    if (!role) {
      cookies.set("authjs.role", "user", {
        sameSite: "strict",
        path: "/",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      });
    }
    const amount = cookies.get("authjs.amount")?.value;
    if (!amount) {
      cookies.set("authjs.amount", "0.00", {
        sameSite: "strict",
        path: "/",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      });
    }

    //Redirectiones de rutas expecificamente en login y register
    if (redirectRoutes.includes(url.pathname)) {
      if (sessionToken && csrfToken) {
        if (role === "admin") {
          return redirect("/admin");
        }else if (role === "user") {
          return redirect("/app/");
        }
      }
    }
    //Redireccion de rutas protegidas del usuario
    if (url.pathname.startsWith(protectedRoutesPrefix)) {
      if (!sessionToken || !csrfToken) {
        return redirect("/login");
      }
    }
    //Redireccion de rutas protegidas del admin
    if (url.pathname.startsWith(adminRoutes)) {
      if (!sessionToken || !csrfToken) {
        return redirect("/login");
      }else if (role === "user") {
        return redirect("/app/");
      }
    }
    return next();
  },
);



