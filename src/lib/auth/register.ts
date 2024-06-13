// import type { APIRoute } from "astro";
// import { supabase } from "@lib/supabase/supabase";

// export const POST: APIRoute = async ({ request, redirect }) => {
//   const formData = await request.formData();
//   const email = formData.get("email")?.toString();
//   const password = formData.get("password")?.toString();
//   // const name = formData.get('name')?.toString()


//   if (/* || name */ !email || !password) {
//     return new Response("Email and password are required", { status: 400 });
//   }

//   const { error } = await supabase.auth.signUp({
//     //name,
//     email,
//     password,
//   });

//   if (error) {
//     return new Response(error.message, { status: 500 });
//   }

//   return redirect("/signin");
// };
