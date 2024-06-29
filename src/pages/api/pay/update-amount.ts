// import type { APIRoute } from "astro"


// export const POST: APIRoute = async ({cookies, redirect, request, params}) => {

//     const amount = Number(cookies.get("authjs.amount")?.value).toFixed(2)
//     if (!amount) {
//         return new Response(JSON.stringify({error: "Amount es requerido"}), {
//             headers: { "content-type": "application/json" },
//             status: 400,
//         });
//     }
//     if(Number(amount) < 0) {
//         return new Response(JSON.stringify({error: "Amount must be greater than 0"}), {
//             headers: { "content-type": "application/json" },
//             status: 400,
//         });
//     }
//     try {
//         const newAmount = Number(amount) + 100
//         cookies.set("authjs.amount", newAmount.toFixed(2), {
//             sameSite: "strict",
//             path: "/",
//             secure: true,
//         });
//         return redirect("/app/cartera")
//     } catch (error) {
//         console.error(error)
//         return new Response("Error", { status: 500 })
//     }

// }

// export const DETELE: APIRoute = async ({ cookies, redirect }) => {
//     const amount = Number(cookies.get("authjs.amount")?.value).toFixed(2)
//     if (!amount) {
//         return new Response(JSON.stringify({error: "Amount es requerido"}), {
//             headers: { "content-type": "application/json" },
//             status: 400,
//         });
//     }
//     if(Number(amount) < 0) {
//         return new Response(JSON.stringify({error: "No existe suficiente Dinero en tu cartera para poder tener tu plan, ve a cartera y deposita el dinero suficiente"}), {
//             headers: { "content-type": "application/json" },
//             status: 400,
//         });
//     }
//     try {
//         const newAmount = Number(amount) - 49.99
//         if (newAmount < 0) {
//             return new Response(JSON.stringify({error: "Insufficient funds"}), {
//                 headers: { "content-type": "application/json" },
//                 status: 400,
//             });
//         }
//         cookies.set("authjs.amount", "0.00", {
//             sameSite: "strict",
//             path: "/",
//             secure: true,
//         });
//         // retornamos la respuesta con una redireccion al sitio anterior de donde el usuario nos llamo
//     } catch (error) {
//         console.error(error)
//         return new Response("Error", { status: 500 })
//     }
// }