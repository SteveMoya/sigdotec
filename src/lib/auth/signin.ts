// import type { APIRoute } from "astro";
// import { supabase } from "@lib/supabase/supabase";
// import type { Provider } from "@supabase/supabase-js";

// export const POST: APIRoute = async ({ request, cookies, redirect }) => {
//   const formData = await request.formData();
//   const email = formData.get("email")?.toString();
//   const password = formData.get("password")?.toString();
//   const provider = formData.get("provider")?.toString();
//   const validProviders = ["google", "github", "facebook"];
  
//   if (provider && validProviders.includes(provider)) {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: provider as Provider,
//       options: {
//         //Aqui se pueden agregar mas datos del usuario para supabase
//       //   data: {
//       //   first_name: 'John',
//       //   age: 27,
//       // },
//         redirectTo: import.meta.env.DEV
//           ? "http://localhost:4321/api/auth/callback"
//           : "https://astro-supabase-auth.vercel.app/api/auth/callback",
//       },
//     });

//     if (error) {
//       return new Response(error.message, { status: 500 });
//     }

//     return redirect(data.url);
//   }

//   if (!email || !password) {
//     return new Response("Email and password are required", { status: 400 });
//   }

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return new Response(error.message, { status: 500 });
//   }
  
//   const { access_token, refresh_token } = data.session;

//   const timeExpirention = 60 * 60 * 24 * 5 * 1000 // <=== 5 Dias 

//    cookies.set("sb-access-token", access_token, {
//     sameSite: "strict",
//     path: "/",
//     secure: true,
//     // expiresIn: timeExpirention,
//   });
//   cookies.set("sb-refresh-token", refresh_token, {
//     sameSite: "strict",
//     path: "/",
//     secure: true,
//     // expiresIn: timeExpirention,
//   });

//   return redirect("/dashboard", 302);
// };
