// import type { APIRoute } from "astro";

// export const GET: APIRoute = async () => {
//     const wallet = {
//         "wallet": 1000
//     }
//     return new Response(JSON.stringify(wallet), {
//         headers: { "content-type": "application/json" },
//         status: 200,
//     });
// }

// export const POST: APIRoute = async ({request }) => {
//     const { amount } = await request.json()
//     const wallet = {
//         "wallet": amount
//     }
//     if (amount < 0) {
//         return new Response(JSON.stringify({error: "Amount must be greater than 0"}), {
//             headers: { "content-type": "application/json" },
//             status: 400,
//         });
//     }

//     return new Response(JSON.stringify(wallet), {
//         headers: { "content-type": "application/json" },
//         status: 200,
//     });
// }

// export const PATCH: APIRoute = async ({request }) => {
//     const { amount } = await request.json()
//     const wallet = {
//         "wallet": amount
//     }
//     // Aqui siempre que se haga una peticion se disminuira el saldo en 100
//     wallet.wallet -= 100
//     if (wallet.wallet < 0) {
//         return new Response(JSON.stringify({error: "Insufficient funds"}), {
//             headers: { "content-type": "application/json" },
//             status: 400,
//         });
//     }

//     return new Response(JSON.stringify(wallet.wallet), {
//         headers: { "content-type": "application/json" },
//         status: 200,
//     });
// }